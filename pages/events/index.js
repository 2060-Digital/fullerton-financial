import Link from "next/link"
import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getAllPublicEvents } from "eventbrite/api"
import openEventbriteRegistration from "eventbrite/openEventbriteRegistration"
import slugify from "utilities/slugify"

export default function EventsArchive({ events }) {
  return (
    <>
      <main>
        <section>
          {events.map((event) => (
            <div className="flex gap-4" key={event.id}>
              <div>{event.start.utc}</div>
              <div>
                <Link href={`/events/${slugify(event.name.text)}-${event.id}`}>
                  <h2>{event.name.html}</h2>
                </Link>
                <time>{event.start.utc}</time>
                <Link href={`/events/venues/${slugify(event.venue.name)}-${event.venue.id}`}>
                  <address>{event.venue.name}</address>
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

export async function getStaticProps() {
  const globals = await getGlobals()
  const events = await getAllPublicEvents()

  return {
    props: {
      events,
      globals,
    },
  }
}
