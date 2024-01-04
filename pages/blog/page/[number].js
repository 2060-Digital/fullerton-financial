import { getGlobals } from "storyblok/api"
import { getBlogArchive, getBlogArchivePaths, getAllBlogCategories } from "storyblok/blog"
import cache from "storyblok/cache"
import BlogArticlesSection from "components/Blog/BlogArticlesSection"
import Meta from "components/Meta"

export default function BlogArchive({ blogArticles, categories, number, total, meta }) {
  return (
    <>
      <Meta info={meta} />
      <BlogArticlesSection {...{ blogArticles, categories, total, number }} />
    </>
  )
}

export async function getStaticProps({ params: { number = 1 } }) {
  const globals = await getGlobals()
  const page = await getBlogArchive()
  const { blogArticles, total } = cache.get(`blog/page/${number}`)
  const categories = await getAllBlogCategories()

  return {
    props: {
      number,
      blogArticles,
      categories,
      total,
      meta: page?.content?.seo ?? null,
      globals: globals ?? null,
      page: page ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getBlogArchivePaths(),
    fallback: false,
  }
}
