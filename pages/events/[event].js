import Script from "next/script"
import { getPage } from "storyblok/api"
import { getSingleEventPaths } from "eventbrite/events"
import { getEventByID } from "eventbrite/api"
import EventbritePageHeader from "components/Eventbrite/EventbritePageHeader"
import VenueMap from "components/Eventbrite/VenueMap"
import DynamicComponent from "components/DynamicComponent"
import StructuredContentSection from "components/Eventbrite/StructuredContentSection"
import Meta from "components/Meta"

export default function IndividualEventPage({ event, story }) {
  if (story?.content?.component === "page") {
    return (
      <>
        <Meta info={story?.content?.seo} />
        <DynamicComponent blok={story?.content} />
      </>
    )
  }

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
        <StructuredContentSection modules={event?.content?.modules} />
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
  const { page, globals } = await getPage(`events/${event}`)

  const individualEvent = await getEventByID(event.split("-").pop())

  return {
    props: {
      globals,
      story: page ?? null,
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
