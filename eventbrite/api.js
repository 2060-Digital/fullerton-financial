import fs from "fs"
import slugify from "slugify"
import { groupBy } from "lodash"
import { format } from "date-fns"
import query from "eventbrite/query"

export async function getOrganizationID() {
  const orgID = await query("/users/me/organizations").then((response) => response.organizations[0].id)

  return orgID
}

export async function getCachedEvents() {
  let events = []
  const path = `${process.cwd()}/public/events.json`
  try {
    const data = fs.readFileSync(path)
    events = JSON.parse(data)
  } catch (error) {
    console.error(error)
    events = await getAllActiveEvents()

    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(events))
    }
  }

  return events
}

export async function getAllActiveEvents() {
  const orgID = await getOrganizationID()

  const { events: eventsNotInSeries } = await query(
    `/organizations/${orgID}/events?series_filter=nonseries&status=live`,
  )
  const { events: eventsInSeries } = await query(`/organizations/${orgID}/events?series_filter=children&status=live`)
  const { events: seriesParents } = await query(`/organizations/${orgID}/events?series_filter=parents&status=live`)

  async function formatEvents(events, slugPrefix = "seminars") {
    const formattedEvents = await Promise.all(
      events.map(async (event) => {
        const venue = await getVenueByID(event.venue_id, event.series_id)

        const content = await query(`/events/${event.id}/structured_content/`).then((response) => {
          const faqs = response.widgets.filter((widget) => widget.type === "faqs")[0]

          return {
            modules: response.modules,
            faqs: faqs?.data?.faqs.map((faq) => ({ title: faq.question, content: faq.answer })),
          }
        })

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
export async function getEventCarouselData() {
  const { eventsInSeries, eventsNotInSeries } = await getCachedEvents()

  const rawEvents = [
    ...eventsInSeries.filter(({ listed }) => listed === true),
    ...eventsNotInSeries.filter(({ listed }) => listed === true),
  ]

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
