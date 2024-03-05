import query from "eventbrite/query"
import cache from "storyblok/cache"
import { groupBy } from "lodash"
import slugify from "slugify"
import { format } from "date-fns"

export async function getOrganizationID() {
  const orgID = await query("/users/me/organizations").then((response) => response.organizations[0].id)

  return orgID
}

export async function getCachedEvents() {
  let events = cache.get("active-events")

  if (!events) {
    events = await getAllActiveEvents()
    cache.set(events, "active-events")
  }

  return events
}

export async function getAllActiveEvents() {
  const orgID = await getOrganizationID()

  const { events: eventsNotInSeries } = await query(
    `/organizations/${orgID}/events?series_filter=nonseries&status=live`,
  )

  // Uncomment once ready to merge
  // const { events: eventsInSeries } = await query(
  //   `/organizations/${orgID}/events?series_filter=children&status=live`,
  // )
  // const { events: seriesParents } = await query(
  //   `/organizations/${orgID}/events?series_filter=parents&status=live`,
  // )

  // Delete once ready to merge
  const { events: eventsInSeries } = await query(
    `/organizations/${orgID}/events?series_filter=children&status=draft&time_filter=current_future`,
  )
  const { events: seriesParents } = await query(
    `/organizations/${orgID}/events?series_filter=parents&status=draft&time_filter=current_future`,
  )

  async function formatEvents(events, slugPrefix = "seminars") {
    const formattedEvents = await Promise.all(
      events.map(async (event) => {
        const venue = await getVenueByID(event.venue_id, event.series_id)

        const content = await query(`/events/${event.id}/structured_content/`).then((response) => response.modules)

        return {
          ...event,
          venue,
          content,
          start: event?.start?.local,
          end: event?.end?.local,
          slug: `/${slugPrefix}/${slugify(event.name.text, {
            lower: true,
          })}-${event.id}`,
        }
      }),
    )
    return formattedEvents
  }

  const eventsWithVenues = {
    eventsNotInSeries: await formatEvents(eventsNotInSeries, "events"),
    eventsInSeries: await formatEvents(eventsInSeries),
    seriesParents: await formatEvents(seriesParents),
  }

  return eventsWithVenues
}

export async function getEventByID(id) {
  const event = await getCachedEvents().then(({ eventsNotInSeries, eventsInSeries }) =>
    [...eventsInSeries, ...eventsNotInSeries].find((event) => event.id === id),
  )

  return event
}

export async function getVenueByID(id, series_id) {
  const venue = await query(`/venues/${id}`)

  return {
    ...venue,
    latitude: parseFloat(venue?.latitude),
    longitude: parseFloat(venue?.longitude),
    directionsLink: `https://maps.google.com/?q=${parseFloat(venue?.latitude)},${parseFloat(venue?.longitude)}`,
    slug: `/seminars/venues/${slugify(venue.name, {
      lower: true,
    })}-${series_id}`,
  }
}

// Components
export async function getEventsForUpcomingEvents() {
  const rawEvents = await getCachedEvents().then(({ eventsInSeries, eventsNotInSeries }) => [
    ...eventsInSeries.filter(({ listed }) => listed === true),
    ...eventsNotInSeries.filter(({ listed }) => listed === true),
  ])

  const eventsBySeries = Object.entries(groupBy(rawEvents, "series_id"))

  const eventsByMonth = eventsBySeries
    .map(([id, eventGroup]) => {
      if (id === "undefined")
        return eventGroup.map((event) => [
          new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(event.start)),
          [event],
          true,
        ])

      return Object.entries(
        groupBy(eventGroup, ({ start }) => {
          return new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(start))
        }),
      )
    })
    .flat()

  const eventsPreparedForEventCarousel = eventsByMonth.map(([month, events, notInSeries]) => {
    const eventDates = events
      .map((event, idx) => {
        return `${format(event?.start, "do")}${idx === events.length - 1 ? "" : idx === events.length - 2 ? " & " : ", "}`
      })
      .join("")

    const combinedEvent = events.reduce((prev, curr) => ({ ...prev, ...curr }), {})
    return {
      dates: `${month} ${eventDates}`,
      id: combinedEvent?.id,
      name: combinedEvent.name.text,
      venue: combinedEvent.venue.name,
      signUpHREF: notInSeries ? combinedEvent.slug : combinedEvent.venue.slug,
    }
  })

  return eventsPreparedForEventCarousel
}
