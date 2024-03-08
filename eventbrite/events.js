import slugify from "slugify"
import retrieveAll from "storyblok/retrieveAll"
import { getCachedEvents } from "eventbrite/api"

import StoryblokEventPaths from "storyblok/gql/events/StoryblokEventPaths.gql"

export async function getEventsForArchive() {
  const allEvents = await getCachedEvents().then(({ eventsNotInSeries }) =>
    eventsNotInSeries.filter(({ listed }) => listed === true),
  )

  return allEvents
}

export async function getSingleEventPaths() {
  const events = await getCachedEvents()?.then(({ eventsNotInSeries }) => {
    return eventsNotInSeries?.map(({ name, id }) => {
      return {
        params: {
          event: `${slugify(name.text, {
            lower: true,
          })}-${id}`,
        },
      }
    })
  })

  const pages = await retrieveAll({ query: StoryblokEventPaths, type: "PageItems", preview: false })

  if (pages?.length) {
    return [...events, ...pages?.map(({ slug }) => ({ params: { event: slug } }))]
  }

  return events
}
