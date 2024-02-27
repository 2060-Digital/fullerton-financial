import { getGlobals } from "storyblok/api"
import { getIndividualWebinarPaths, getWebinarByIDs } from "go-to-webinar/api"
import WebinarPage from "components/Webinars/WebinarPage"

export default function Webinar({ webinar }) {
  return <WebinarPage webinar={webinar} />
}

export async function getStaticProps({ params: { webinar } }) {
  const globals = await getGlobals()

  const webinarIDs = webinar.split("-")

  const individualWebinar = await getWebinarByIDs(webinarIDs[webinarIDs.length - 2], webinarIDs[webinarIDs.length - 1])

  return {
    props: {
      globals,
      webinar: individualWebinar ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getIndividualWebinarPaths(),
    fallback: false,
  }
}
