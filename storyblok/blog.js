import { BLOG_ARTICLES_PER_PAGE } from "utilities/blogHelpers"
import retrieveAll from "storyblok/retrieveAll"
import cache from "storyblok/cache"
import query from "storyblok/fetch"
import generateSBPlaiceholders from "utilities/generateSBPlaiceholders"

import BlogArchive from "storyblok/gql/blog/BlogArchive.gql"
import AllBlogArticles from "storyblok/gql/blog/AllBlogArticles.gql"
import BlogArticlePaths from "storyblok/gql/blog/BlogArticlePaths.gql"
import BlogArticleBySlug from "storyblok/gql/blog/BlogArticleBySlug.gql"
import BlogCategories from "storyblok/gql/blog/BlogCategories.gql"

export async function getBlogArchive() {
  const data = await query(BlogArchive)

  return await generateSBPlaiceholders(data?.BlogarchiveItem)
}

export async function getAllBlogArticles() {
  const data = await retrieveAll({
    query: AllBlogArticles,
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
    query: BlogArticlePaths,
    type: "BlogarticleItems",
    preview: false,
  })

  // processed for use by getStaticPaths
  return data?.map(({ slug }) => ({ params: { slug } }))
}

export async function getBlogArticle(slug) {
  const data = await query(BlogArticleBySlug, { variables: { slug: `blog/${slug}` } })

  return await generateSBPlaiceholders({
    content: { ...data?.BlogarticleItem?.content, slug: `${data?.BlogarticleItem?.full_slug}` },
  })
}

export async function getAllBlogCategories() {
  const data = await query(BlogCategories)

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
