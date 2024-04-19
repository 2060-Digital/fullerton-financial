import { getGlobals } from "storyblok/api"
import { getBlogArchive, getBlogArchivePaths, getAllBlogCategories } from "storyblok/blog"
import cache from "storyblok/cache"
import BlogArticlesSection from "components/BlogArticlesSection"
import Meta from "components/Meta"
import PageHeader from "components/DynamicComponent/molecules/PageHeader"

export default function BlogArchive({ story, blogArticles, categories, number, total, meta }) {
  return (
    <>
      <Meta info={meta} />
      <main>
        <PageHeader
          blok={{ heading: story?.content?.heading, image: story?.content?.image, breadcrumbs: [{ text: "Blog" }] }}
        />
        <BlogArticlesSection
          {...{ blogArticles, categories, total, number, currentTab: { name: "All", value: "all" } }}
        />
      </main>
    </>
  )
}

export async function getStaticProps({ params: { number = 1 } }) {
  const globals = await getGlobals()
  const story = await getBlogArchive()
  const { blogArticles, total } = cache.get(`blog/page/${number}`)
  const categories = await getAllBlogCategories()

  return {
    props: {
      number,
      blogArticles,
      categories,
      total,
      meta: story?.content?.twentysixty_seo ?? null,
      globals: globals ?? null,
      story: story ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getBlogArchivePaths(),
    fallback: false,
  }
}
