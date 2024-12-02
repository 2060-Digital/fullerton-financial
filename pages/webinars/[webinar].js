import { getGlobals } from "storyblok/api"

import WebinarPage from "components/Webinars/WebinarPage"
import ZoomWebinarPage from "components/Webinars/ZoomWebinarPage"
import { getWebinar, getWebinarPaths } from "storyblok/webinars"
import { getIndividualWebinar, getIndividualWebinarPaths } from "zoom/webinars"
import extractId from "utilities/extractId"

export default function Webinar({ webinar, zoomWebinar }) {
  return (
    <>
      {webinar && <WebinarPage webinar={webinar.content} />}
      {zoomWebinar && <ZoomWebinarPage webinar={zoomWebinar} />}
    </>
  )
}

export async function getStaticProps({ params: { webinar } }) {
  const globals = await getGlobals()
  let onDemandWebinar = await getWebinar(`webinars/${webinar}`)

  let zoomWebinar

  if (onDemandWebinar.content.name === undefined) {
    zoomWebinar = await getIndividualWebinar(extractId(webinar))
    onDemandWebinar = null
  }

  return {
    props: {
      globals,
      webinar: onDemandWebinar ?? null,
      zoomWebinar: zoomWebinar ?? null,
    },
  }
}

export async function getStaticPaths() {
  const futureWebinarPaths = await getIndividualWebinarPaths()
  const onDemandWebinarPaths = await getWebinarPaths()

  const allWebinarPaths = [...futureWebinarPaths, ...onDemandWebinarPaths]

  return {
    paths: allWebinarPaths,
    fallback: false,
  }
}
