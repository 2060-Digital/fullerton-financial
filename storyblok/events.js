import query from "storyblok/fetch"
import EventArchive from "storyblok/gql/events/EventArchive.gql"

export async function getEventArchive(slug, preview) {
  const data = await query(EventArchive, { preview, slug })

  return data?.EventsarchiveItem
}
