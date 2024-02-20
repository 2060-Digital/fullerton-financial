import { getGlobals } from "storyblok/api"
import { getWebinarsArchive } from "storyblok/events"
import Meta from "components/Meta"
import DynamicComponent from "components/DynamicComponent"

export default function WebinarsArchive({ meta, story }) {
  return (
    <>
      <Meta info={meta} />

      <main className="page-content" data-pagefind-body>
        {story?.content?.body?.map((blok) => (
          <DynamicComponent blok={blok} key={blok?._uid} />
        ))}
      </main>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()

  const story = await getWebinarsArchive(preview)

  return {
    props: {
      preview,
      globals,
      story: story ?? null,
      meta: story?.content?.seo,
    },
  }
}
