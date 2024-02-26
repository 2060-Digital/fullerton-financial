import { getGlobals } from "storyblok/api"
import { getWebinarsArchive } from "storyblok/webinars"
import Meta from "components/Meta"
import DynamicComponent from "components/DynamicComponent"
import { getAllFutureWebinars } from "go-to-webinar/api"
import WebinarListSection from "components/Webinars/WebinarListSection"

export default function WebinarsArchive({ meta, story, webinars }) {
  return (
    <>
      <Meta info={meta} />

      <main className="page-content" data-pagefind-body>
        {story?.content?.body?.map((blok) => (
          <DynamicComponent blok={blok} key={blok?._uid} />
        ))}
        <WebinarListSection webinars={webinars} />
      </main>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()

  const story = await getWebinarsArchive(preview)

  const webinars = await getAllFutureWebinars()

  return {
    props: {
      preview,
      globals,
      story: story ?? null,
      webinars: webinars ?? null,
      meta: story?.content?.seo,
    },
  }
}
