import query from "eventbrite/query"
import slugify from "slugify"

export async function getOrganizationID() {
  const orgID = await query("/users/me/organizations").then((response) => response.organizations[0].id)

  return orgID
}

// Events
export async function getAllActiveEvents() {
  const orgID = await getOrganizationID()

  const events = await query(`/organizations/${orgID}/events?status=live`).then(({ events }) => events)

  const eventsWithVenues = await Promise.all(
    events.map(async (event) => {
      const venue = await getVenueByID(event.venue_id)

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

  return allEvents.map((event) => ({ ...event, start: event?.start?.utc, end: event?.end?.utc }))
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

  const venue = await getVenueByID(event.venue_id)

  return { ...event, start: event?.start?.local, end: event?.end?.local, venue, content }
}

export async function getEventSeriesByID(id) {
  const eventSeries = await query(`/series/${id}`)

  const venue = await getVenueByID(eventSeries.venue_id)

  return { ...eventSeries, venue }
}

// Venues
export async function getVenuePaths() {
  const events = await getAllActiveEvents()

  const eventsInSeries = events.filter(({ series_id }) => series_id)
  const uniqueSeriesIDs = [...new Set(eventsInSeries)].map(({ series_id }) => series_id)

  const eventSeries = await Promise.all(
    uniqueSeriesIDs.map(async (id) => {
      const series = await getEventSeriesByID(id)

      return series
    }),
  )

  return eventSeries?.map(({ venue }) => {
    return {
      params: {
        venue: `${slugify(venue.name, {
          lower: true,
        })}-${venue.id}`,
      },
    }
  })
}

export async function getVenueByID(id) {
  const venue = await query(`/venues/${id}`)

  return {
    ...venue,
    slug: `/events/venues/${slugify(venue.name, {
      lower: true,
    })}-${venue.id}`,
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
