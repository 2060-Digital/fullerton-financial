import slugify from "slugify"
import { getCachedEvents } from "eventbrite/api"

export async function getEventsForArchive() {
  const allEvents = await getCachedEvents().then(({ eventsNotInSeries }) =>
    eventsNotInSeries.filter(({ listed }) => listed === true),
  )

  return allEvents
}

export async function getSingleEventPaths() {
  const { eventsNotInSeries } = await getCachedEvents()

  return eventsNotInSeries?.map(({ name, id }) => {
    return {
      params: {
        event: `${slugify(name.text, {
          lower: true,
        })}-${id}`,
      },
    }
  })
}
