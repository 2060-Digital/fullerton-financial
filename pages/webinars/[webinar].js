import { getGlobals } from "storyblok/api"

import WebinarPage from "components/Webinars/WebinarPage"
import { getWebinar, getWebinarPaths } from "storyblok/webinars"

export default function Webinar({ webinar }) {
  return (
    <>
      <WebinarPage webinar={webinar.content} />
    </>
  )
}

export async function getStaticProps({ params: { webinar } }) {
  const globals = await getGlobals()
  const onDemandWebinar = await getWebinar(`webinars/${webinar}`)

  return {
    props: {
      globals,
      webinar: onDemandWebinar ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getWebinarPaths(),
    fallback: false,
  }
}
