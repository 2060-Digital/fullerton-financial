import { getGlobals } from "storyblok/api"
import { getAllWebinars, getWebinarsArchive } from "storyblok/webinars"
import Meta from "components/Meta"
import Divider from "components/DynamicComponent/atoms/Divider"
import DynamicComponent from "components/DynamicComponent"

import OnDemandWebinarSection from "components/Webinars/OnDemandWebinarSection"

export default function WebinarsArchive({ meta, story, webinars }) {
  return (
    <>
      <Meta info={meta} />

      <main className="page-content event-archive" data-pagefind-body>
        {story?.content?.body?.map((blok) => (
          <DynamicComponent blok={blok} key={blok?._uid} />
        ))}

        <Divider />
        <OnDemandWebinarSection webinars={webinars} />
      </main>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()

  const story = await getWebinarsArchive(preview)
  const webinars = await getAllWebinars()

  return {
    props: {
      preview,
      globals,
      story: story ?? null,
      webinars: webinars ?? null,

      meta: story?.content?.twentysixty_seo,
    },
  }
}
