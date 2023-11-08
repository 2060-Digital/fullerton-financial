import slugify from "utilities/slugify"

export async function getOrganizationID() {
  const orgID = await fetch(`https://www.eventbriteapi.com/v3/users/me/organizations/`, {
    headers: {
      Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((json) => json.organizations[0].id)

  return orgID
}

export async function getAllActiveEvents() {
  const orgID = await getOrganizationID()

  const events = await fetch(`https://www.eventbriteapi.com/v3/organizations/${orgID}/events/?status=live`, {
    headers: {
      Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then(({ events }) => events)

  const eventsWithVenues = await Promise.all(
    events.map(async (event) => {
      const venue = await getVenueByID(event.venue_id)

      return { ...event, venue }
    }),
  )

  return eventsWithVenues
}

export async function getAllPublicEvents() {
  const allEvents = await getAllActiveEvents()

  return allEvents.filter(({ listed }) => listed === true)
}

export async function getIndividualEventPaths() {
  const events = await getAllActiveEvents()

  return events?.map(({ name, id }) => {
    return { params: { event: `${slugify(name.text)}-${id}` } }
  })
}

export async function getEventByID(id) {
  const event = await fetch(`https://www.eventbriteapi.com/v3/events/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
    },
  }).then((response) => response.json())

  const venue = await getVenueByID(event.venue_id)

  return { ...event, venue }
}

export async function getEventSeriesByID(id) {
  const eventSeries = await fetch(`https://www.eventbriteapi.com/v3/series/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
    },
  }).then((response) => response.json())

  const venue = await getVenueByID(eventSeries.venue_id)

  return { ...eventSeries, venue }
}

export async function getVenuePaths() {
  const events = await getAllActiveEvents()

  const eventSeries = await Promise.all(
    Array.from(new Set(events.map(({ series_id }) => series_id))).map(async (id) => {
      const series = await getEventSeriesByID(id)

      return series
    }),
  )

  return eventSeries?.map(({ venue }) => {
    return { params: { venue: `${slugify(venue.name)}-${venue.id}` } }
  })
}

export async function getVenueByID(id) {
  const venue = await fetch(`https://www.eventbriteapi.com/v3/venues/${id}/`, {
    headers: {
      Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
    },
  }).then((response) => response.json())

  return venue
}

export async function getEventsByVenue(venueID) {
  const events = await fetch(`https://www.eventbriteapi.com/v3/venues/${venueID}/events/?status=live`, {
    headers: {
      Authorization: `Bearer ${process.env.EVENTBRITE_PRIVATE_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then(({ events }) => events)

  return events
}
