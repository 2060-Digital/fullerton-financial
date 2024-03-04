import { getGlobals } from "storyblok/api"
import { getIndividualWebinarPaths, getWebinarByIDs } from "go-to-webinar/api"
import WebinarPage from "components/Webinars/WebinarPage"
import Script from "next/script"

export default function Webinar({ webinar }) {
  return (
    <>
      <WebinarPage webinar={webinar} />
      <Script type="application/ld+json" id="event-schema">
        {`{
        "@context": "https://schema.org",
        "@type": "BusinessEvent",
        "name": "${webinar?.subject}",
        "location": {
          "@type": "VirtualLocation",
          "url": "https://www.goto.com/webinar"
        },
        "offers": "${webinar?.registrationUrl}",
        "startDate": "${webinar?.times[0]?.startTime}",
        "endDate": "${webinar?.times[0]?.endTime}",
        ${webinar?.description?.length ? `"description": "${webinar.description}",` : ""}
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode"
      }`}
      </Script>
    </>
  )
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
