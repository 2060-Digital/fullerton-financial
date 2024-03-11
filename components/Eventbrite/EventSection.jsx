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
      <article className="flex flex-col items-center justify-between gap-4 bg-secondary-2 pb-7 lg:flex-row lg:pr-7 lg:pt-7">
        <div className="flex w-full flex-col items-start lg:flex-row lg:items-center lg:gap-12">
          <DateBox month={time?.month} day={time?.day} />
          <div className="px-6 lg:px-0">
            <Link href={event.slug}>
              <h3 className="pb-2 text-primary-1 hover:underline">{event?.name?.text}</h3>
            </Link>
            <h4 className="pb-2 text-primary-1">{time?.fullDate}</h4>
            <h4 className="text-primary-1">
              <VenueLink event={event} venue={venue} />
            </h4>
          </div>
        </div>
        <div className="flex w-full px-6 lg:w-max lg:px-0">
          <RegisterNowLink {...{ embedCreated, setEmbedCreated, eventHash }} />
        </div>
      </article>
      <EventbriteModal {...modalProps} eventHash={eventHash} />
    </>
  )
}

export default function EventSection({ events }) {
  return (
    <section className="py-12 sm:px-6 lg:py-24">
      <h2 className="pb-8 text-center text-primary-1 lg:pb-16">Upcoming Events</h2>

      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        {events?.map((event) => (
          <Event event={event} venue={event?.venue} key={event?.id} />
        ))}
      </div>
    </section>
  )
}
