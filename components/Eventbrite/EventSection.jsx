import Link from "next/link"
import useEventbriteModal from "eventbrite/useEventbriteModal"
import RegisterNowLink from "components/Eventbrite/RegisterNowLink"
import EventbriteModal from "components/Eventbrite/EventbriteModal"
import { formatEventDate } from "utilities/formatEventDate"
import VenueLink from "components/Eventbrite/VenueLink"
import DateBox from "components/DateBox"
import { format } from "date-fns"
import { useEffect, useState } from "react"

export function Event({ event, venue }) {
  const { embedCreated, setEmbedCreated, modalProps, eventHash } = useEventbriteModal(event)

  const [time, setTime] = useState({})

  useEffect(() => {
    const formattedTime = {
      month: format(event?.start, "MMM"),
      day: format(event?.start, "dd"),
      fullDate: formatEventDate(event?.start, event?.end),
    }
    setTime(formattedTime)
  }, [event])

  return (
    <>
      <article className="flex flex-col lg:flex-row justify-between lg:pt-7 pb-7 lg:pr-7 gap-4 items-center bg-secondary-2">
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:gap-12 w-full">
          <DateBox month={time?.month} day={time?.day} />
          <div className="px-6 lg:px-0">
            <Link href={event.slug}>
              <h3 className="text-primary-1 hover:underline pb-2">{event?.name?.text}</h3>
            </Link>
            <h4 className="pb-2 text-primary-1">{time?.fullDate}</h4>
            <h4 className="text-primary-1">
              <VenueLink event={event} venue={venue} />
            </h4>
          </div>
        </div>
        <div className="px-6 lg:px-0 w-full lg:w-max flex">
          <RegisterNowLink {...{ embedCreated, setEmbedCreated, eventHash }} />
        </div>
      </article>
      <EventbriteModal {...modalProps} eventHash={eventHash} />
    </>
  )
}

export default function EventSection({ events }) {
  return (
    <section className="sm:px-6 py-12 lg:py-24">
      <h2 className="text-center text-primary-1 pb-8 lg:pb-16">Upcoming Events</h2>

      <div className="flex flex-col gap-8 max-w-screen-xl mx-auto">
        {events?.map((event) => (
          <Event event={event} venue={event?.venue} key={event?.id} />
        ))}
      </div>
    </section>
  )
}
