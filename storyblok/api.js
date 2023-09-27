import { BLOG_ARTICLES_PER_PAGE } from "utilities/blogHelpers"
import retrieveAll from "storyblok/retrieveAll"
import cache from "storyblok/cache"
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
          }
          created_at
          published_at
          full_slug
          slug
        }
      }
  `,
    { preview, variables: { slug } }
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

// Blog API
export async function getBlogArchive() {
  const data = await query(`#graphql
  query BlogArchive {
    BlogarchiveItem(id: "blog") {
      created_at
      published_at
    }
  }`)
  return await generateSBPlaiceholders(data?.BlogarchiveItem)
}

export async function getAllBlogArticles() {
  const data = await retrieveAll({
    query: `#graphql
      query AllBlogArticles($page: Int!, $per_page: Int!) {
        BlogarticleItems(page: $page, per_page: $per_page) {
          items {
            content {
              category
              component
              content
              date
              featured_image {
                alt
                filename
              }
              featured_video
              title
            }
            slug
            created_at
            published_at
          }
          total
        }
      }`,
    type: "BlogarticleItems",
    preview: false,
  })

  const sortedData = data.sort((a, b) => new Date(b.content.date) - new Date(a.content.date))
  const withPlaceholders = await Promise.all(sortedData.map(async (article) => await generateSBPlaiceholders(article)))

  return withPlaceholders
}

export async function getBlogArchivePaths() {
  const articles = await getAllBlogArticles()

  let paths = []
  const total = articles.length

  for (let i = 0; i < total; i++) {
    if (i % BLOG_ARTICLES_PER_PAGE === 0) {
      const blogArticles = articles?.slice(i, i + BLOG_ARTICLES_PER_PAGE)
      paths.push({ params: { number: String(Math.ceil(i / BLOG_ARTICLES_PER_PAGE) + 1) } })
      cache.set({ total, blogArticles }, `blog/page/${Math.ceil(i / BLOG_ARTICLES_PER_PAGE) + 1}`)
    }
  }
  return paths
}

export async function getAllBlogArticlePaths() {
  const data = await retrieveAll({
    query: `#graphql
    query GetAllBlogArticlePaths($page: Int!, $per_page: Int!) {
      BlogarticleItems(page: $page, per_page: $per_page) {
          items {
            slug
          }
          total
        }
      }
    `,
    type: "BlogarticleItems",
    preview: false,
  })

  // processed for use by getStaticPaths
  return data?.map(({ slug }) => ({ params: { slug } }))
}

export async function getBlogArticle(slug) {
  const data = await query(
    `#graphql
    query BlogItemBySlug($slug: ID!) {
      BlogarticleItem(id: $slug) {
        slug
        full_slug
        created_at
        published_at
        content {
          title
          category
          content
          date
          featured_video
          featured_image {
            alt
            filename
          }
        }
      }
    }
  `,
    { variables: { slug: `blog/${slug}` } }
  )
  return await generateSBPlaiceholders(data?.BlogarticleItem)
}

export async function getAllBlogCategories() {
  const data = await query(`#graphql
  query AllBlogCategories {
    DatasourceEntries(datasource: "blog-categories") {
      items {
        name
        value
      }
    }
  }
  `)

  return data?.DatasourceEntries.items
}

export async function getAllBlogCategoryItems() {
  const categories = await getAllBlogCategories()
  const blogArticles = await getAllBlogArticles()

  const categoryArticles = categories.map(({ value }) => ({
    value,
    articles: blogArticles.filter((article) => article.content.category.includes(value)),
  }))

  return categoryArticles
}

export async function getAllBlogCategoryPaths() {
  const categoryArticleItems = await getAllBlogCategoryItems()

  let paths = []

  categoryArticleItems.map((items) => {
    if (items.articles.length > 0) {
      items.articles.map((article, idx) => {
        if (idx % BLOG_ARTICLES_PER_PAGE === 0) {
          const blogArticles = items.articles.slice(idx, idx + BLOG_ARTICLES_PER_PAGE)
          paths.push({ params: { category: items.value, number: String(Math.ceil(idx / BLOG_ARTICLES_PER_PAGE) + 1) } })
          cache.set(
            { total: items.articles.length, blogArticles },
            `blog/category/${items.value}/${String(Math.ceil(idx / BLOG_ARTICLES_PER_PAGE) + 1)}`
          )
        }
      })
    } else {
      paths.push({ params: { category: items.value, number: "1" } })
      cache.set({ total: 0, blogArticles: [] }, `blog/category/${items.value}/1`)
    }
  })

  return paths
}
