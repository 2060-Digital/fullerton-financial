import query from "storyblok/fetch"
import generateSBPlaiceholders from "utilities/generateSBPlaiceholders"
import retrieveAll from "./retrieveAll"
import WebinarsArchive from "storyblok/gql/webinars/WebinarsArchive.gql"
import WebinarPaths from "storyblok/gql/webinars/WebinarPaths.gql"
import IndividualWebinar from "storyblok/gql/webinars/IndividualWebinar.gql"
import AllWebinars from "storyblok/gql/webinars/AllWebinars.gql"

export async function getWebinarsArchive(preview) {
  const data = await query(WebinarsArchive, { preview })

  return data?.WebinararchiveItem
}

export async function getAllWebinars(preview) {
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

export async function getWebinar(slug, preview) {
  const data = await query(IndividualWebinar, { variables: { slug }, preview })

  const withPlaceholders = await generateSBPlaiceholders(data.WebinarondemandItem)

  return {
    content: {
      ...withPlaceholders?.content,
      slug: `/${withPlaceholders?.full_slug}`,
      name: withPlaceholders?.name,
    },
  }
}
