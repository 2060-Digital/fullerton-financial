import Meta from "components/Meta"
import DynamicComponent from "components/DynamicComponent"
import { getAllPageSlugs, getPage } from "storyblok/api"

export default function Page({ story, meta }) {
  return (
    <>
      <Meta info={meta} />
      <DynamicComponent blok={story?.content} />
    </>
  )
}

export async function getStaticProps({ params: { slug }, preview = null }) {
  slug = slug.length > 1 ? slug.join("/") : slug.join("")
  const { page, globals } = await getPage(slug, preview)

  return {
    props: {
      globals,
      story: page ?? null,
      meta: page?.content?.twentysixty_seo ?? null,
      preview,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getAllPageSlugs(),
    fallback: false,
  }
}
