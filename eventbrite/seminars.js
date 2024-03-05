import query from "eventbrite/query"
import slugify from "slugify"

import { getCachedEvents } from "eventbrite/api"
import { groupBy } from "lodash"

export async function getSeminarsForArchive() {
  const allEvents = await getCachedEvents().then(({ eventsInSeries }) =>
    eventsInSeries.filter(({ listed }) => listed === true),
  )

  return allEvents.map((event) => ({ ...event, start: event?.start?.local, end: event?.end?.local }))
}

export async function getSeminarPaths() {
  const { eventsInSeries } = await getCachedEvents()

  return eventsInSeries?.map(({ name, id }) => {
    return {
      params: {
        event: `${slugify(name.text, {
          lower: true,
        })}-${id}`,
      },
    }
  })
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

  const events = await getCachedEvents().then(({ eventsInSeries }) => {
    return (
      eventsInSeries
        .filter((event) => event?.series_id === id)
        // .filter(({ status, listed }) => status === "live" && listed)
        .map((event) => ({
          ...event,
          venue,
          start: event?.start?.local,
          end: event?.end?.local,
          slug: `/seminars/${slugify(event.name.text, {
            lower: true,
          })}-${event.id}`,
        }))
    )
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
  const { eventsInSeries } = await getCachedEvents()
  // console.log(groupBy(eventsInSeries, "series_id"))
  const uniqueSeriesIDs = eventsInSeries.map(({ series_id }) => series_id)

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
    directionsLink: `https://maps.google.com/?q=${parseFloat(venue?.latitude)},${parseFloat(venue?.longitude)}`,
    slug: `/events/venues/${slugify(venue.name, {
      lower: true,
    })}-${series_id}`,
  }
}
