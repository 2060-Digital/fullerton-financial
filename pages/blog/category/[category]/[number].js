import { getGlobals } from "storyblok/api"
import { getAllBlogCategoryPaths, getBlogArchive, getAllBlogCategories } from "storyblok/blog"
import cache from "storyblok/cache"
import BlogArticlesSection from "components/BlogArticlesSection"
import Head from "next/head"

export default function Category({ category, blogArticles, categories, number, total }) {
  return (
    <>
      <Head>
        <title>{`${category}`}</title>
      </Head>
      <BlogArticlesSection {...{ blogArticles, categories, total, number }} />
    </>
  )
}

export async function getStaticProps({ params: { number = 1, category } }) {
  const globals = await getGlobals()
  const { blogArticles, total } = cache.get(`blog/category/${category}/${number}`)
  const page = await getBlogArchive()
  const categories = await getAllBlogCategories()

  return {
    props: {
      category,
      categories,
      number,
      blogArticles,
      total,
      globals: globals ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getAllBlogCategoryPaths(),
    fallback: false,
  }
}
