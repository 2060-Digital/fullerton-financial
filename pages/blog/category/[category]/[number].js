import { getGlobals } from "storyblok/api"
import { getAllBlogCategoryPaths, getBlogArchive, getAllBlogCategories } from "storyblok/blog"
import cache from "storyblok/cache"
import BlogArticlesSection from "components/BlogArticlesSection"
import PageHeader from "components/DynamicComponent/molecules/PageHeader"
import Meta from "components/Meta"

export default function Category({ story, category, blogArticles, categories, number, total }) {
  return (
    <>
      <Meta
        info={{
          title: category?.name,
          og_title: category?.name,
          twitter_title: category?.name,
          og_image: story?.content?.image,
          twitter_image: story?.content?.image,
        }}
      />
      <main data-pagefind-body>
        <PageHeader
          blok={{
            heading: story?.content?.heading,
            image: story?.content?.image,
            breadcrumbs: [{ text: "Blog", href: "/blog/page/1" }, { text: category?.name }],
          }}
        />
        <BlogArticlesSection {...{ blogArticles, categories, total, number, currentTab: category }} />
      </main>
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
