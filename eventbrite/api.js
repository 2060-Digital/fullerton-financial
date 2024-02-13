import query from "eventbrite/query"
import { groupBy } from "lodash"
import slugify from "slugify"
import { formatPluralDay } from "eventbrite/formatEventDate"

export async function getOrganizationID() {
  const orgID = await query("/users/me/organizations").then((response) => response.organizations[0].id)

  return orgID
}

// Event Page
export async function getAllActiveEvents() {
  const orgID = await getOrganizationID()

  const events = await query(`/organizations/${orgID}/events?status=live`).then(({ events }) => events)

  const eventsWithVenues = await Promise.all(
    events.map(async (event) => {
      const venue = await getVenueByID(event.venue_id, event.series_id)

      return {
        ...event,
        venue,
        slug: `/events/${slugify(event.name.text, {
          lower: true,
        })}-${event.id}`,
      }
    }),
  )

  return eventsWithVenues
}

export async function getAllPublicEvents() {
  const allEvents = await getAllActiveEvents().then((response) => response.filter(({ listed }) => listed === true))

  return allEvents.map((event) => ({ ...event, start: event?.start?.local, end: event?.end?.local }))
}

export async function getIndividualEventPaths() {
  const events = await getAllActiveEvents()

  return events?.map(({ name, id }) => {
    return {
      params: {
        event: `${slugify(name.text, {
          lower: true,
        })}-${id}`,
      },
    }
  })
}

export async function getEventByID(id) {
  const event = await query(`/events/${id}`)

  const content = await query(`/events/${id}/structured_content`)

  const venue = await getVenueByID(event.venue_id, event.series_id)

  return {
    ...event,
    start: event?.start?.local,
    end: event?.end?.local,
    venue: { ...venue, latitude: parseFloat(venue?.latitude), longitude: parseFloat(venue?.longitude) },
    content,
  }
}

// Venue Pages
export async function getEventSeriesWithEvents(id) {
  const eventSeries = await query(`/series/${id}`).then((response) => ({
    ...response,
    image: { filename: response.logo.original.url },
    content: response?.summary?.length
      ? {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: response.summary,
                  type: "text",
                },
              ],
            },
          ],
        }
      : null,
  }))

  const venue = await getVenueByID(eventSeries.venue_id, id)

  const events = await query(`/series/${id}/events`).then((response) => {
    return response.events
      .filter(({ status, listed }) => status === "live" && listed)
      .map((event) => ({
        ...event,
        venue,
        start: event?.start?.local,
        end: event?.end?.local,
        slug: `/events/${slugify(event.name.text, {
          lower: true,
        })}-${event.id}`,
      }))
  })

  const structured_content = await query(`/events/${id}/structured_content/`).then((response) => response.modules)

  return { ...eventSeries, events, structured_content, venue }
}

export async function getEventSeriesByID(id) {
  const eventSeries = await query(`/series/${id}`)

  const venue = await getVenueByID(eventSeries.venue_id, id)

  return { ...eventSeries, venue }
}

export async function getVenuePaths() {
  const eventsInSeries = await getAllActiveEvents().then((response) => response.filter(({ series_id }) => series_id))

  const uniqueSeriesIDs = [...new Set(eventsInSeries)].map(({ series_id }) => series_id)

  const eventSeries = await Promise.all(
    uniqueSeriesIDs.map(async (id) => {
      const series = await getEventSeriesByID(id)

      return { ...series, series_id: id }
    }),
  )

  return eventSeries?.map(({ venue, series_id }) => {
    return {
      params: {
        venue: `${slugify(venue.name, {
          lower: true,
        })}-${series_id}`,
      },
    }
  })
}

export async function getVenueByID(id, series_id) {
  const venue = await query(`/venues/${id}`)

  return {
    ...venue,
    latitude: parseFloat(venue?.latitude),
    longitude: parseFloat(venue?.longitude),
    slug: `/events/venues/${slugify(venue.name, {
      lower: true,
    })}-${series_id}`,
  }
}

export async function getEventsByVenue(venueID, venue) {
  const events = await query(`/venues/${venueID}/events?status=live`).then(({ events }) => events)

  return events.map((event) => ({
    ...event,
    venue,
    start: event?.start?.local,
    end: event?.end?.local,
    slug: `/events/${slugify(event.name.text, {
      lower: true,
    })}-${event.id}`,
  }))
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
        const date = new Date(event.start)
        return `${new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(date)}${formatPluralDay(date.getDate())}${idx === events.length - 1 ? "" : idx === events.length - 2 ? " & " : ", "}`
      })
      .join("")

    const combinedEvent = events.reduce((prev, curr) => ({ ...prev, ...curr }), {})
    return {
      dates: `${month} ${eventDates}`,
      id: combinedEvent?.id,
      name: combinedEvent.name.html,
      venue: combinedEvent.venue.name,
      signUpHREF: notInSeries ? combinedEvent.slug : combinedEvent.venue.slug,
    }
  })

  return eventsPreparedForEventCarousel
}
