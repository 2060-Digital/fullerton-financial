import { getGlobals } from "storyblok/api"
import { getAllBlogCategoryPaths, getBlogArchive, getAllBlogCategories } from "storyblok/blog"
import cache from "storyblok/cache"
import BlogArticlesSection from "components/BlogArticlesSection"
import Head from "next/head"
import PageHeader from "components/DynamicComponent/molecules/PageHeader"

export default function Category({ story, category, blogArticles, categories, number, total }) {
  return (
    <>
      <Head>
        <title>{`${category?.name}`}</title>
      </Head>
      <PageHeader
        blok={{ heading: story?.content?.heading, image: story?.content?.image, breadcrumbs: [{ text: "Blog" }] }}
      />
      <BlogArticlesSection {...{ blogArticles, categories, total, number, currentTab: category }} />
    </>
  )
}

export async function getStaticProps({ params: { number = 1, category } }) {
  const globals = await getGlobals()
  const { blogArticles, total } = cache.get(`blog/category/${category}/${number}`)
  const story = await getBlogArchive()
  const categories = await getAllBlogCategories()

  return {
    props: {
      category: { name: category.replaceAll("-", " "), value: category },
      categories,
      number,
      blogArticles,
      story: story ?? null,
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
