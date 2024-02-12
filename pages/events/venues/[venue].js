import { getGlobals } from "storyblok/api"
import { getEventsByVenue, getVenueByID, getVenuePaths } from "eventbrite/api"
import PageHeader from "components/DynamicComponent/molecules/PageHeader"
import EventSection from "components/Eventbrite/EventSection"
import VenueMap from "components/Eventbrite/VenueMap"
import Meta from "components/Meta"

export default function Venue({ venue, events }) {
  return (
    <>
      <Meta
        info={{
          title: venue?.name,
          og_title: venue?.name,
          twitter_title: venue?.name,
        }}
      />
      <main>
        <PageHeader blok={{ heading: venue?.name }} />
        <EventSection events={events} />
        <VenueMap venue={venue} />
      </main>
    </>
  )
}

export async function getStaticProps({ params: { venue } }) {
  const globals = await getGlobals()
  const id = venue.split("-")[venue.split("-").length - 1]

  const individualVenue = await getVenueByID(id)

  const events = await getEventsByVenue(id, individualVenue)

  return {
    props: {
      globals,
      events,
      venue: individualVenue ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getVenuePaths(),
    fallback: false,
  }
}
