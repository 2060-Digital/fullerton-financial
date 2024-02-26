import Link from "next/link"
import CallToAction from "components/CallToAction"
import DateBox from "components/DateBox"

export function Webinar({ webinar }) {
  return (
    <article className="flex flex-col lg:flex-row justify-between lg:pt-7 pb-7 lg:pr-7 gap-4 items-center bg-secondary-2">
      <div className="flex flex-col lg:flex-row items-start lg:items-center lg:gap-12 w-full">
        <DateBox date={webinar?.times[0]?.raw?.startTime} />
        <div className="px-6 lg:px-0">
          <Link href={webinar.slug}>
            <h3 className="text-primary-1 hover:underline pb-2">{webinar?.subject}</h3>
          </Link>
          {webinar?.times?.map((time) => (
            <h4 className="pb-2 text-primary-1" key={`${time?.formatted}-webinar-${webinar?.webinarKey}`}>
              {time?.formatted}
            </h4>
          ))}
        </div>
      </div>
      <div className="px-6 lg:px-0 w-full lg:w-max flex">
        <CallToAction href={webinar?.registrationUrl}>Register Now</CallToAction>
      </div>
    </article>
  )
}

export default function WebinarListSection({ webinars }) {
  return (
    <section className="sm:px-6 py-12 lg:py-24">
      <h2 className="text-center text-primary-1 pb-8 lg:pb-16">Upcoming Events</h2>

      <div className="flex flex-col gap-8 max-w-screen-xl mx-auto">
        {webinars?.map((webinar) => (
          <Webinar webinar={webinar} key={webinar?.webinarKey} />
        ))}
      </div>
    </section>
  )
}
