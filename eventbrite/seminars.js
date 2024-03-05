import slugify from "slugify"
import query from "eventbrite/query"
import { getCachedEvents } from "eventbrite/api"

export async function getSeminarsForArchive() {
  const allEvents = await getCachedEvents().then(({ eventsInSeries }) =>
    eventsInSeries.filter(({ listed }) => listed === true),
  )

  return allEvents
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
  const eventSeries = await getCachedEvents().then(({ seriesParents }) => {
    const currentSeries = seriesParents.find(({ series_id }) => series_id === id)

    return {
      ...currentSeries,
      image: { filename: currentSeries.logo.original.url },
      headerContent: currentSeries?.summary?.length
        ? {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    text: currentSeries.summary,
                    type: "text",
                  },
                ],
              },
            ],
          }
        : null,
    }
  })

  const events = await getCachedEvents().then(({ eventsInSeries }) =>
    eventsInSeries.filter((event) => event?.series_id === id),
  )

  return { ...eventSeries, events }
}

export async function getVenuePaths() {
  const { seriesParents } = await getCachedEvents()

  return seriesParents?.map(({ venue, series_id }) => {
    return {
      params: {
        venue: `${slugify(venue.name, {
          lower: true,
        })}-${series_id}`,
      },
    }
  })
}
