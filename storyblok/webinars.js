import query from "storyblok/fetch"
import WebinarsArchive from "storyblok/gql/webinars/WebinarsArchive.gql"

export async function getWebinarsArchive(preview) {
  const data = await query(WebinarsArchive, { preview })

  return data?.WebinararchiveItem
}
