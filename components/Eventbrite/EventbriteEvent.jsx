import Link from "next/link"
import useEventbriteModal from "eventbrite/useEventbriteModal"
import RegisterNowLink from "components/Eventbrite/RegisterNowLink"
import EventbriteModal from "components/Eventbrite/EventbriteModal"

export default function Event({ event, venue }) {
  const { embedCreated, setEmbedCreated, modalProps, eventHash } = useEventbriteModal(event)

  return (
    <>
      <div className="flex gap-4">
        <div>{event.start.utc}</div>
        <div>
          <Link href={event.slug} className="underline hover:no-underline">
            <h2>{event.name.html}</h2>
          </Link>
          <time>{event.start.utc}</time>
          {event.series_id ? (
            <Link href={venue.slug} className="underline hover:no-underline">
              <address>{venue.name}</address>
            </Link>
          ) : (
            <address>{venue.name}</address>
          )}
        </div>
        <RegisterNowLink {...{ embedCreated, setEmbedCreated, eventHash }} />
      </div>
      <EventbriteModal {...modalProps} eventHash={eventHash} />
    </>
  )
}
