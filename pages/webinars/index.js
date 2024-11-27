import { getGlobals } from "storyblok/api"
import { getAllWebinars, getWebinarsArchive } from "storyblok/webinars"
import { getMeetings } from "zoom/getToken"
import Meta from "components/Meta"
import Divider from "components/DynamicComponent/atoms/Divider"
import DynamicComponent from "components/DynamicComponent"

import OnDemandWebinarSection from "components/Webinars/OnDemandWebinarSection"
import WebinarListSection from "components/Webinars/WebinarListSection"

export default function WebinarsArchive({ meta, story, webinars, futureWebinars }) {
  return (
    <>
      <Meta info={meta} />

      <main className="page-content event-archive" data-pagefind-body>
        {story?.content?.body?.map((blok) => (
          <DynamicComponent blok={blok} key={blok?._uid} />
        ))}
        <Divider />
        <WebinarListSection webinars={webinars} />
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

  const futureWebinars = await getMeetings()

  return {
    props: {
      preview,
      globals,
      story: story ?? null,
      webinars: webinars ?? null,
      futureWebinars,
      meta: story?.content?.twentysixty_seo,
    },
  }
}
