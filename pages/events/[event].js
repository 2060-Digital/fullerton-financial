import Link from "next/link"
import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getEventByID, getIndividualEventPaths } from "eventbrite/api"
import slugify from "utilities/slugify"
import useModal from "utilities/useModal"
import Modal from "components/Modal"
import useEventbriteEmbed from "eventbrite/useEventbriteEmbed"

export default function IndividualEventPage({ event, eventID }) {
  const { isOpen, closeModal, openModal, focusRef } = useModal(`event-${slugify(event.name.text)}-${eventID}`)

  const { modalOpened, setModalOpened } = useEventbriteEmbed(event)

  return (
    <>
      <main>
        <section>
          <h1>{event.name.text}</h1>
          <time>{event.start.utc}</time>

          {event.series_id ? (
            <Link
              href={`/events/venues/${slugify(event.venue.name)}-${event.venue.id}`}
              className="underline hover:no-underline"
            >
              <address>{event.venue.name}</address>
            </Link>
          ) : (
            <address>{event.venue.name}</address>
          )}
          <Link
            href={`#event-${slugify(event.name.text)}-${eventID}`}
            onClick={() => {
              if (!modalOpened) setModalOpened(true)
            }}
            className="underline hover:no-underline"
          >
            Register Now
          </Link>
        </section>
        <Modal {...{ isOpen, closeModal, openModal, focusRef }}>
          <div id={`event-${slugify(event.name.text)}-${eventID}`}></div>
        </Modal>
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
