import DynamicComponent from "components/DynamicComponent"
import Meta from "components/Meta"
import { getPage } from "storyblok/api"

export default function Home({ story, meta }) {
  return (
    <>
      <Meta info={meta} />
      <DynamicComponent blok={story?.content} />
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  // home is the default slug for the homepage in Storyblok, but we've aliased it to '/' here and in the visual editor.
  // This template would otherwise be identical to pages/[...slug.js] and therefore unnecessary
  const { page, globals } = await getPage("home", preview)

  return {
    props: {
      globals,
      story: page ?? null,
      meta: page?.content?.seo ?? null,
      preview,
    },
  }
}
