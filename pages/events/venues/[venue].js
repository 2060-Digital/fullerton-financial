import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getEventsByVenue, getVenueByID, getVenuePaths } from "eventbrite/api"
import Event from "components/Eventbrite/EventbriteEvent"

export default function Venue({ venue, events }) {
  return (
    <>
      <main>
        <section>
          <h1>{venue.name}</h1>
        </section>
        <section>
          {events.map((event) => (
            <Event event={event} venue={venue} key={event.id} />
          ))}
        </section>
      </main>
      <Script src="https://www.eventbrite.com/static/widgets/eb_widgets.js" />
    </>
  )
}

export async function getStaticProps({ params: { venue } }) {
  const globals = await getGlobals()
  const id = venue.split("-")[venue.split("-").length - 1]

  const individualVenue = await getVenueByID(id)

  const events = await getEventsByVenue(id)

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
