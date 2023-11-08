import Link from "next/link"
import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getEventByID, getIndividualEventPaths } from "eventbrite/api"
import openEventbriteRegistration from "eventbrite/openEventbriteRegistration"
import slugify from "utilities/slugify"

export default function IndividualEventPage({ event, eventId }) {
  return (
    <>
      <main>
        <section>
          <h1>{event.name.text}</h1>
          <time>{event.start.utc}</time>
          <Link href={`/events/venues/${slugify(event.venue.name)}-${event.venue.id}`}>
            <address>{event.venue.name}</address>
          </Link>
          <button id={`event-${eventId}`} onClick={() => openEventbriteRegistration(eventId)}>
            Register Now
          </button>
        </section>
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
      eventId: id,
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
