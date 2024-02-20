import query from "storyblok/fetch"
import EventArchive from "storyblok/gql/events/EventArchive.gql"
import WebinarsArchive from "storyblok/gql/events/WebinarsArchive.gql"

export async function getEventArchive(preview) {
  const data = await query(EventArchive, { preview })

  return data?.EventsarchiveItem
}

export async function getWebinarsArchive(preview) {
  const data = await query(WebinarsArchive, { preview })

  return data?.WebinararchiveItem
}
