import { BLOG_ARTICLES_PER_PAGE } from "utilities/blogHelpers"
import retrieveAll from "storyblok/retrieveAll"
import cache from "storyblok/cache"
import query from "storyblok/fetch"
import generateSBPlaiceholders from "utilities/generateSBPlaiceholders"

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
    { variables: { slug: `blog/${slug}` } },
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
            `blog/category/${items.value}/${String(Math.ceil(idx / BLOG_ARTICLES_PER_PAGE) + 1)}`,
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
