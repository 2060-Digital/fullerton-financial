import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getAllPublicEvents } from "eventbrite/api"
import Event from "components/Eventbrite/EventbriteEvent"

export default function EventsArchive({ events }) {
  return (
    <>
      <main>
        <section>
          {events.map((event) => (
            <Event event={event} venue={event.venue} key={event.id} />
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
