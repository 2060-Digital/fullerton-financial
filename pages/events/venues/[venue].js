import Link from "next/link"
import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getEventsByVenue, getVenueByID, getVenuePaths } from "eventbrite/api"
import slugify from "utilities/slugify"
import openEventbriteRegistration from "eventbrite/openEventbriteRegistration"

export default function Venue({ venue, events }) {
  return (
    <>
      <main>
        <section>
          <h1>{venue.name}</h1>
        </section>
        <section>
          {events.map((event) => (
            <div className="flex gap-4" key={event.id}>
              <div>{event.start.utc}</div>
              <div>
                <Link href={`/events/${slugify(event.name.text)}-${event.id}`}>
                  <h2>{event.name.html}</h2>
                </Link>
                <time>{event.start.utc}</time>
                <Link href={`/events/venues/${slugify(venue.name)}-${venue.id}`}>
                  <address>{venue.name}</address>
                </Link>
              </div>
              <button id={`event-${event.id}`} onClick={() => openEventbriteRegistration(event.id)}>
                Register Now
              </button>
            </div>
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
