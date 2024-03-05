import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getEventByID } from "eventbrite/api"
import EventbritePageHeader from "components/Eventbrite/EventbritePageHeader"
import VenueMap from "components/Eventbrite/VenueMap"
import StructuredContentSection from "components/Eventbrite/StructuredContentSection"
import Meta from "components/Meta"
import { getSingleEventPaths } from "eventbrite/events"

export default function IndividualEventPage({ event }) {
  return (
    <>
      <Meta
        info={{
          title: event?.name?.html,
          description: event?.description?.html,
          og_title: event?.name?.html,
          og_image: event?.logo?.original?.url,
          og_description: event?.description?.html,
          twitter_title: event?.name?.html,
          twitter_image: event?.logo?.original?.url,
          twitter_description: event?.description?.html,
        }}
      />
      <main data-pagefind-body>
        <EventbritePageHeader event={event} />
        <StructuredContentSection modules={event?.content} />
        <VenueMap venue={event?.venue} />
      </main>
      <Script type="application/ld+json" id="event-schema">
        {`{
           "@context": "https://schema.org",
           "@type": "BusinessEvent",
           "name": "${event?.name?.text}",
           "startDate": "${event?.start}",
           "endDate": "${event?.end}",
           "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          ${event?.description?.text?.length ? `"description": "${event?.description?.text}",` : ""}
           "location": {
             "@type": "Place",
             "name": "${event?.venue?.name}",
             "address": {
               "@type": "PostalAddress",
               "streetAddress": "${event?.venue?.address?.address_1}${event?.venue?.address?.address_2?.length ? ` ${event?.venue?.address?.address_2}` : ""}",
               "addressLocality": "${event?.venue?.address?.city}",
               "postalCode": "${event?.venue?.address?.postal_code}",
               "addressRegion": "${event?.venue?.address?.region}",
               "addressCountry": "US"
             }
           }
        }`}
      </Script>
      <Script src="https://www.eventbrite.com/static/widgets/eb_widgets.js" />
    </>
  )
}

export async function getStaticProps({ params: { event } }) {
  const globals = await getGlobals()

  const individualEvent = await getEventByID(event.split("-").pop())

  return {
    props: {
      globals,
      event: individualEvent ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getSingleEventPaths(),
    fallback: false,
  }
}
