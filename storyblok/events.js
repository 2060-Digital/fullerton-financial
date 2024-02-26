import query from "storyblok/fetch"
import EventArchive from "storyblok/gql/events/EventArchive.gql"
import WebinarsArchive from "storyblok/gql/webinars/WebinarsArchive.gql"

export async function getEventArchive(preview) {
  const data = await query(EventArchive, { preview })

  return data?.EventsarchiveItem
}
