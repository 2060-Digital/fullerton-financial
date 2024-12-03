import { TZDate } from "@date-fns/tz"
import { subHours, add, format } from "date-fns"
import cn from "classnames"
import CallToAction from "components/CallToAction"
import Image from "components/Image"
import Meta from "components/Meta"
import { formatEventDate } from "utilities/formatEventDate"

export default function ZoomWebinarPage({ webinar }) {
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
    <>
      <Meta
        info={{
          title: webinar?.topic,
          og_title: webinar?.topic,
          twitter_title: webinar?.topic,
          description: webinar?.agenda,
          og_description: webinar?.agenda,
          twitter_description: webinar?.agenda,
          og_image: "/assets/fullerton-team.jpg",
          twitter_image: "/assets/fullerton-team.jpg",
        }}
      />

      <section className={cn("mt-24 bg-primary-1 pb-12 pl-6 sm:pb-16 lg:mt-16 lg:pb-0 lg:pl-0")}>
        <div className={cn("mx-auto flex max-w-screen-2xl flex-col-reverse lg:flex-row lg:gap-12")}>
          <div
            className={cn(
              "w-full max-w-md justify-self-end pr-6 lg:ml-6 lg:self-center lg:py-8 lg:pr-0 xl:ml-[72px] xl:mr-14 2xl:ml-[94px] 2xl:mr-12 2xl:pl-8",
            )}
          >
            <h1 className="pb-4 text-white">{webinar?.topic}</h1>
            <h4 className="pb-4 text-white">{formattedTimes?.formatted}</h4>
            <div className="flex flex-col gap-4 md:flex-row">
              <CallToAction href={webinar.registration_url}>REGISTER NOW</CallToAction>
              <CallToAction href={webinar.join_url}>JOIN WEBINAR</CallToAction>
            </div>
          </div>

          <div className="relative -top-16 right-0 -mb-8 mr-3 h-full w-full self-end justify-self-end border-2 border-secondary-1 lg:-top-10 lg:-mb-0">
            <Image
              loader={null}
              src={webinar?.image?.filename ? webinar?.image?.filename : "/assets/fullerton-team.jpg"}
              alt=""
              width={896}
              height={585}
              className="relative -right-3.5 -top-3.5 aspect-[896/505] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="pb-8 text-primary-1 lg:text-center">Webinar Description</h2>
          <p>{webinar.agenda}</p>
        </div>
      </section>
    </>
  )
}
