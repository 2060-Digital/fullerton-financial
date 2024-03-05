import query from "eventbrite/query"
import cache from "storyblok/cache"
import { groupBy } from "lodash"
import slugify from "slugify"
import { format } from "date-fns"
import { getVenueByID } from "eventbrite/seminars"

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

  // Uncomment once ready to merge
  // const eventsNotInSeries = await query(`/organizations/${orgID}/events?series_filter=nonseries&status=live`).then(
  //   ({ events }) => events,
  // )
  // const eventsInSeries = await query(`/organizations/${orgID}/events?series_filter=allseries&status=live`).then(
  //   ({ events }) => events,
  // )
  const eventsNotInSeries = await query(`/organizations/${orgID}/events?series_filter=nonseries&status=draft`).then(
    ({ events }) => events,
  )
  const eventsInSeries = await query(`/organizations/${orgID}/events?series_filter=allseries&status=draft`).then(
    ({ events }) => events,
  )

  const eventsWithVenues = {
    eventsNotInSeries: await Promise.all(
      eventsNotInSeries.map(async (event) => {
        const venue = await getVenueByID(event.venue_id, event.series_id)

        return {
          ...event,
          venue,
          slug: `/events/${slugify(event.name.text, {
            lower: true,
          })}-${event.id}`,
        }
      }),
    ),
    eventsInSeries: await Promise.all(
      eventsInSeries.map(async (event) => {
        const venue = await getVenueByID(event.venue_id, event.series_id)

        return {
          ...event,
          venue,
          slug: `/seminars/${slugify(event.name.text, {
            lower: true,
          })}-${event.id}`,
        }
      }),
    ),
  }

  return eventsWithVenues
}

export async function getEventByID(id) {
  const event = await query(`/events/${id}`)

  const content = await query(`/events/${id}/structured_content`)

  const venue = await getVenueByID(event.venue_id, event.series_id)

  return {
    ...event,
    start: event?.start?.local,
    end: event?.end?.local,
    venue,
    content,
  }
}

export async function getAllPublicEvents() {
  const allEvents = await getCachedEvents().then(({ eventsInSeries, eventsNotInSeries }) => [
    ...eventsInSeries.filter(({ listed }) => listed === true),
    ...eventsNotInSeries.filter(({ listed }) => listed === true),
  ])

  return allEvents.map((event) => ({ ...event, start: event?.start?.local, end: event?.end?.local }))
}

// Components
export async function getEventsForUpcomingEvents() {
  const rawEvents = await getAllPublicEvents()

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
