import Link from "next/link"
import slugify from "utilities/slugify"
import useEventbriteEmbed from "eventbrite/useEventbriteEmbed"
import useModal from "utilities/useModal"
import Modal from "components/Eventbrite/EventbriteModal"

export default function Event({ event, venue }) {
  const { isOpen, closeModal, openModal, focusRef } = useModal(`event-${slugify(event.name.text)}-${event.id}`)

  const { modalOpened, setModalOpened } = useEventbriteEmbed(event)

  return (
    <>
      <div className="flex gap-4">
        <div>{event.start.utc}</div>
        <div>
          <Link href={`/events/${slugify(event.name.text)}-${event.id}`} className="underline hover:no-underline">
            <h2>{event.name.html}</h2>
          </Link>
          <time>{event.start.utc}</time>
          {event.series_id ? (
            <Link href={`/events/venues/${slugify(venue.name)}-${venue.id}`} className="underline hover:no-underline">
              <address>{venue.name}</address>
            </Link>
          ) : (
            <address>{venue.name}</address>
          )}
        </div>
        <Link
          href={`#event-${slugify(event.name.text)}-${event.id}`}
          onClick={() => {
            if (!modalOpened) setModalOpened(true)
          }}
          className="underline hover:no-underline"
        >
          Register Now
        </Link>
      </div>
      <Modal {...{ isOpen, closeModal, openModal, focusRef }}>
        <div id={`event-${slugify(event.name.text)}-${event.id}`}></div>
      </Modal>
    </>
  )
}
