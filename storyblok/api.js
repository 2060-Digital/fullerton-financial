import retrieveAll from "storyblok/retrieveAll"
import query from "storyblok/fetch"
import generateSBPlaiceholders from "utilities/generateSBPlaiceholders"

export async function getAllPageSlugs() {
  const data = await retrieveAll({
    query: `#graphql
      query AllPageSlugs($page: Int!, $per_page: Int!) {
        PageItems(excluding_slugs: "home", page: $page, per_page: $per_page) {
          items {
            full_slug
          }
          total
        }
      }
  `,
    type: "PageItems",
    preview: false,
  })

  // processed for use by getStaticPaths
  return data?.map(({ full_slug }) => ({ params: { slug: full_slug.split("/") } }))
}

export async function getPage(slug, preview) {
  const globalData = await getGlobals()

  const data = await query(
    `#graphql
      query PostBySlug($slug: ID!) {
          PageItem(id: $slug) {
          content {
            _editable
            _uid
            body
            component
            seo
          }
          created_at
          published_at
          full_slug
          slug
        }
      }
  `,
    { preview, variables: { slug } },
  )

  return {
    page: await generateSBPlaiceholders(data?.PageItem),
    globals: globalData,
  }
}

const globalCache = new Map()

export async function getGlobals() {
  // if (globalCache.has("data")) return globalCache.get("data")
  // const data = await query(`#graphql
  //   query GlobalData {
  //     global: DatasourceEntries(datasource: "global") {
  //       items {
  //         name
  //         value
  //       }
  //     }
  //     phoneNumbers: DatasourceEntries(datasource: "phone-numbers") {
  //       items {
  //         name
  //         value
  //       }
  //     }
  //   }
  // `)

  const headerData = await query(`#graphql
  query HeaderMenus {
    MenuItem(id: "menus/") {
      id
      content {
        _editable
        _uid
        component
        menu_items
      }
    }
  }
  `)

  // const footerData = await query(`#graphql
  //   query FooterMenus {
  //     MenuItems(starts_with: "menus/footer") {
  //       items {
  //         id
  //         name
  //         content {
  //           _uid
  //           component
  //           menu_items
  //           _editable
  //         }
  //       }
  //     }
  //   }
  // `)

  const globalData = {
    // ...data.global.items.reduce((acc, { name, value }) => ({ [name]: value, ...acc }), {}),
    // phoneNumbers: data.phoneNumbers,
    // footerMenus: footerData.MenuItems.items.reverse(),
    header: headerData.MenuItem.content.menu_items,
  }

  globalCache.set("data", globalData)

  return globalData
}
