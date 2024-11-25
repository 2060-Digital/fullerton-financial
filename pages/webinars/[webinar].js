import { getGlobals } from "storyblok/api"

import WebinarPage from "components/Webinars/WebinarPage"
import Script from "next/script"
import { getWebinarPaths } from "storyblok/webinars"

export default function Webinar({ webinar }) {
  return (
    <>
      <WebinarPage webinar={webinar} />
      {/* <Script type="application/ld+json" id="event-schema">
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
      </Script> */}
    </>
  )
}

export async function getStaticProps({ params: { webinar } }) {
  const globals = await getGlobals()

  return {
    props: {
      globals,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getWebinarPaths(),
    fallback: false,
  }
}
