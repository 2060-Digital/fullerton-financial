import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getVenuePaths, getEventSeriesWithEvents } from "eventbrite/seminars"
import PageHeader from "components/DynamicComponent/molecules/PageHeader"
import EventSection from "components/Eventbrite/EventSection"
import VenueMap from "components/Eventbrite/VenueMap"
import Meta from "components/Meta"
import StructuredContentSection from "components/Eventbrite/StructuredContentSection"

export default function Venue({ eventSeries }) {
  return (
    <>
      <Meta
        info={{
          title: eventSeries?.venue?.name,
          og_title: eventSeries?.venue?.name,
          twitter_title: eventSeries?.venue?.name,
        }}
      />
      <main data-pagefind-body>
        <PageHeader
          blok={{ heading: eventSeries?.venue?.name, image: eventSeries.image, content: eventSeries.content }}
        />
        <StructuredContentSection modules={eventSeries?.structured_content} />
        <EventSection events={eventSeries.events} />
        <VenueMap venue={eventSeries.venue} />
      </main>
      <Script src="https://www.eventbrite.com/static/widgets/eb_widgets.js" />
    </>
  )
}

export async function getStaticProps({ params: { venue } }) {
  const globals = await getGlobals()

  const eventSeries = await getEventSeriesWithEvents(venue.split("-").pop())

  return {
    props: {
      globals,
      eventSeries: eventSeries ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getVenuePaths(),
    fallback: false,
  }
}
