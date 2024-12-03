import slugify from "slugify"
import { tz, TZDate } from "@date-fns/tz"
import Link from "next/link"
import { format, add, subHours } from "date-fns"
import CallToAction from "components/CallToAction"
import DateBox from "components/DateBox"
import { formatEventDate } from "utilities/formatEventDate"

export function Webinar({ webinar }) {
  const date = new TZDate(webinar.start_time)

  const azTime = subHours(date, 2)

  const end_time = add(azTime, {
    minutes: webinar.duration,
  })

  const formattedTimes = {
    formattedMonth: format(azTime, "MMM"),
    formattedDay: format(azTime, "dd"),
    formatted: formatEventDate(azTime, end_time),
  }

  return (
    <article className="flex flex-col items-center justify-between gap-4 bg-secondary-2 pb-7 lg:flex-row lg:pr-7 lg:pt-7">
      <div className="flex w-full flex-col items-start lg:flex-row lg:items-center lg:gap-12">
        <DateBox month={formattedTimes?.formattedMonth} day={formattedTimes?.formattedDay} />
        <div className="px-6 lg:px-0">
          <Link
            href={`webinars/${slugify(webinar.topic, {
              lower: true,
            })}-${webinar.id}`}
          >
            <h3 className="pb-2 text-primary-1 hover:underline">{webinar?.topic}</h3>
          </Link>

          <h4 className="pb-2 text-primary-1 last:pb-0">{formattedTimes?.formatted}</h4>
        </div>
      </div>
      <div className="flex w-full px-6 lg:w-max lg:px-0">
        <CallToAction
          href={`webinars/${slugify(webinar.topic, {
            lower: true,
          })}-${webinar.id}`}
        >
          View Details
        </CallToAction>
      </div>
    </article>
  )
}

export default function WebinarListSection({ webinars }) {
  return (
    <section className="py-12 sm:px-6 lg:py-24">
      <h2 className="pb-8 text-center text-primary-1 lg:pb-16">Upcoming Events</h2>

      <div className="mx-auto flex max-w-screen-xl flex-col gap-8">
        {webinars?.length ? (
          <>
            {webinars?.map((webinar) => (
              <Webinar webinar={webinar} key={webinar?.id} />
            ))}
          </>
        ) : (
          <div className="w-full bg-secondary-2 px-6 py-7 text-center sm:py-12">
            <h3 className="pb-4 text-primary-1">Sorry, there are no upcoming webinars.</h3>
            <h4 className="text-primary-1">Check back for updates soon.</h4>
          </div>
        )}
      </div>
    </section>
  )
}
