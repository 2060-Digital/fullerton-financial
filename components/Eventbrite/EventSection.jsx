import Link from "next/link"
import useEventbriteModal from "eventbrite/useEventbriteModal"
import RegisterNowLink from "components/Eventbrite/RegisterNowLink"
import EventbriteModal from "components/Eventbrite/EventbriteModal"
import { formartEventTime, formatEventDate, formatEventStartEndTime } from "eventbrite/formatEventDate"

export function Event({ event, venue }) {
  const { embedCreated, setEmbedCreated, modalProps, eventHash } = useEventbriteModal(event)

  const Venue = () => {
    const addressStyles = "not-italic text-primary-1"

    if (event?.series_id) {
      return (
        <Link href={venue?.slug}>
          <address className={`${addressStyles} hover:underline`}>{venue?.name}</address>
        </Link>
      )
    }

    return <address className={addressStyles}>{venue?.name}</address>
  }

  return (
    <>
      <article className="flex flex-col lg:flex-row justify-between lg:pt-7 pb-7 lg:pr-7 gap-4 items-center bg-secondary-2">
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:gap-12 w-full">
          <div className="bg-secondary-1 mb-4 lg:mb-0 py-4 px-6 lg:py-8 lg:px-10 text-center aspect-square">
            <div className="eyebrow text-white">
              {new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(event?.start))}
            </div>
            <h3 className="text-white">
              {new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(new Date(event?.start))}
            </h3>
          </div>
          <div className="px-6 lg:px-0">
            <Link href={event.slug}>
              <h3 className="text-primary-1 hover:underline pb-2">{event?.name?.html}</h3>
            </Link>
            <h4 className="pb-2 text-primary-1">
              {formatEventDate(event?.start)}, {formatEventStartEndTime(event?.start, event?.end)}
            </h4>
            <time>{event.start.utc}</time>
            <h4>
              <Venue />
            </h4>
          </div>
        </div>
        <div className="px-6 lg:px-0 w-full lg:w-max flex items-">
          <RegisterNowLink {...{ embedCreated, setEmbedCreated, eventHash }} />
        </div>
      </article>
      <EventbriteModal {...modalProps} eventHash={eventHash} />
    </>
  )
}

export default function EventSection({ events }) {
  return (
    <section className="sm:px-6 py-12">
      <h2 className="text-center text-primary-1 pb-8 lg:pb-16">Upcoming Events</h2>

      <div className="flex flex-col gap-8 max-w-screen-xl mx-auto">
        {events?.map((event) => (
          <Event event={event} venue={event?.venue} key={event?.id} />
        ))}
      </div>
    </section>
  )
}
