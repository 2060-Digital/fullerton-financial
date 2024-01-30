import retrieveAll from "storyblok/retrieveAll"
import query from "storyblok/fetch"
import generateSBPlaiceholders from "utilities/generateSBPlaiceholders"

import AllPageSlugs from "storyblok/gql/page/AllPageSlugs.gql"
import PageBySlug from "storyblok/gql/page/PageBySlug.gql"
import Menus from "storyblok/gql/global/Menus.gql"
import Datasources from "storyblok/gql/global/Datasources.gql"
import GlobalSections from "storyblok/gql/global/GlobalSections.gql"
import AllLocations from "storyblok/gql/location/AllLocations.gql"

export async function getAllPageSlugs() {
  const data = await retrieveAll({
    query: AllPageSlugs,
    type: "PageItems",
    preview: false,
  })

  // processed for use by getStaticPaths
  return data?.map(({ full_slug }) => ({ params: { slug: full_slug.split("/") } }))
}

export async function getPage(slug, preview) {
  const data = await query(PageBySlug, { preview, variables: { slug } })

  const globalData = await getGlobals(data?.PageItem?.uuid)

  return {
    page: await generateSBPlaiceholders(data?.PageItem),
    globals: globalData,
  }
}

const globalCache = new Map()

export async function getGlobals(pageUID) {
  if (globalCache.has("data")) {
    let cache = globalCache.get("data")
    if (
      cache?.ctaBanner &&
      (pageUID === "exclude-global-sections" || cache.ctaBanner.excluded_pages?.includes(pageUID))
    ) {
      cache = {
        ...cache,
        ctaBanner: false,
      }
    }
    return cache
  }

  const datasources = await query(Datasources)

  const menus = await retrieveAll({ query: Menus, preview: false, type: "MenuItems" }).then((items) =>
    items.reduce((prev, curr) => ({ [curr.slug]: curr.content.menu_items, ...prev }), {}),
  )

  const locations = await getAllLocations()

  const globalSection = await query(GlobalSections)

  const globalData = {
    socialMedia: datasources.socialMedia.items.reduce((acc, { name, value }) => ({ [name]: value, ...acc }), {}),
    phoneNumbers: datasources.phoneNumbers.items.reduce((acc, { name, value }) => ({ [name]: value, ...acc }), {}),
    ctaBanner: globalSection?.GlobalsectionsItem?.content?.cta_banner[0],
    locations,
    ...menus,
  }

  if (
    pageUID === "exclude-global-sections" ||
    globalSection?.GlobalsectionsItem?.content?.cta_banner[0].excluded_pages?.includes(pageUID)
  ) {
    return {
      ...globalData,
      ctaBanner: false,
    }
  }

  globalCache.set("data", globalData)

  return globalData
}

export async function getAllLocations() {
  const locations = await retrieveAll({ query: AllLocations, preview: false, type: "LocationItems" }).then((items) =>
    items.map((item) => ({ ...item.content, slug: `/${item.full_slug}` })),
  )

  return locations
}
