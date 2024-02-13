import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getEventByID, getIndividualEventPaths } from "eventbrite/api"
import EventbritePageHeader from "components/Eventbrite/EventbritePageHeader"
import VenueMap from "components/Eventbrite/VenueMap"
import StructuredContentSection from "components/Eventbrite/StructuredContentSection"
import Meta from "components/Meta"

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
      <main>
        <EventbritePageHeader event={event} />
        <StructuredContentSection modules={event?.content?.modules} />
        <VenueMap venue={event?.venue} />
      </main>
      <Script src="https://www.eventbrite.com/static/widgets/eb_widgets.js" />
    </>
  )
}

export async function getStaticProps({ params: { event } }) {
  const globals = await getGlobals()

  const id = event.split("-")[event.split("-").length - 1]
  const individualEvent = await getEventByID(id)

  return {
    props: {
      globals,
      eventID: id,
      event: individualEvent ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getIndividualEventPaths(),
    fallback: false,
  }
}
