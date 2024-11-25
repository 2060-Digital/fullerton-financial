import query from "storyblok/fetch"
import retrieveAll from "./retrieveAll"
import WebinarsArchive from "storyblok/gql/webinars/WebinarsArchive.gql"
import WebinarPaths from "storyblok/gql/webinars/WebinarPaths.gql"
import AllWebinars from "storyblok/gql/webinars/AllWebinars.gql"

export async function getWebinarsArchive(preview) {
  const data = await query(WebinarsArchive, { preview })

  return data?.WebinararchiveItem
}

export async function getAllWebinars(preview) {
  // const data = await query(AllWebinars, { preview })

  const data = await retrieveAll({
    query: AllWebinars,
    type: "WebinarondemandItems",
    preview: false,
  })

  return data
}

export async function getWebinarPaths() {
  const data = await retrieveAll({ query: WebinarPaths, type: "WebinarondemandItems", preview: false })

  return data?.map(({ slug }) => ({ params: { webinar: slug } }))
}
