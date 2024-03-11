import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import CallToAction from "components/CallToAction"
import DateBox from "components/DateBox"
import { formatEventDate } from "utilities/formatEventDate"

export function Webinar({ webinar }) {
  const [times, setTimes] = useState([])

  useEffect(() => {
    const formattedTimes = webinar?.times?.map((time) => ({
      formattedMonth: format(time.startTime, "MMM"),
      formattedDay: format(time.startTime, "dd"),
      formatted: formatEventDate(time.startTime, time.endTime),
    }))
    setTimes(formattedTimes)
  }, [webinar])

  return (
    <article className="flex flex-col items-center justify-between gap-4 bg-secondary-2 pb-7 lg:flex-row lg:pr-7 lg:pt-7">
      <div className="flex w-full flex-col items-start lg:flex-row lg:items-center lg:gap-12">
        <DateBox month={times[0]?.formattedMonth} day={times[0]?.formattedDay} />
        <div className="px-6 lg:px-0">
          <Link href={webinar.slug}>
            <h3 className="pb-2 text-primary-1 hover:underline">{webinar?.subject}</h3>
          </Link>
          {times?.map((time) => (
            <h4 className="pb-2 text-primary-1 last:pb-0" key={`${time?.formatted}-webinar-${webinar?.webinarKey}`}>
              {time?.formatted}
            </h4>
          ))}
        </div>
      </div>
      <div className="flex w-full px-6 lg:w-max lg:px-0">
        <CallToAction href={webinar?.registrationUrl}>Register Now</CallToAction>
      </div>
    </article>
  )
}

export default function WebinarListSection({ webinars }) {
  return (
    <section className="py-12 sm:px-6 lg:py-24">
      <h2 className="pb-8 text-center text-primary-1 lg:pb-16">Upcoming Events</h2>

      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        {webinars?.map((webinar) => (
          <Webinar webinar={webinar} key={webinar?.webinarKey} />
        ))}
      </div>
    </section>
  )
}
