import { useEffect, useState } from "react"
import cn from "classnames"
import CallToAction from "components/CallToAction"
import Image from "components/Image"
import Meta from "components/Meta"
import { formatEventDate } from "utilities/formatEventDate"

export default function WebinarPage({ webinar, onDemand = false }) {
  const hasImage = Boolean(webinar?.image?.length)

  const [times, setTimes] = useState([])

  useEffect(() => {
    if (webinar?.times && !onDemand) {
      const formattedTimes = webinar?.times?.map((time) => formatEventDate(time.startTime, time.endTime))
      setTimes(formattedTimes)
    }
  }, [webinar, onDemand])

  return (
    <>
      <Meta
        info={{
          title: webinar?.subject,
          og_title: webinar?.subject,
          twitter_title: webinar?.subject,
          description: webinar?.description,
          og_description: webinar?.description,
          twitter_description: webinar?.description,
          og_image: webinar?.image,
          twitter_image: webinar?.image,
        }}
      />
      <section
        className={cn("bg-primary-1", {
          "mt-24 pb-12 pl-6 sm:pb-16 lg:mt-16 lg:pb-0 lg:pl-0": hasImage,
          "px-6 py-8 lg:py-12": !hasImage,
        })}
      >
        <div
          className={cn({
            "mx-auto flex max-w-screen-2xl flex-col-reverse lg:flex-row lg:gap-12": hasImage,
            "mx-auto max-w-screen-xl": !hasImage,
          })}
        >
          <div
            className={cn({
              "w-full max-w-md justify-self-end pr-6 lg:ml-6 lg:self-center lg:py-8 lg:pr-0 xl:ml-[72px] xl:mr-14 2xl:ml-[94px] 2xl:mr-12 2xl:pl-8":
                hasImage,
            })}
          >
            <h1 className="pb-4 text-white">{webinar?.subject}</h1>
            {onDemand ? (
              <div className="block pb-4 font-primary text-m1 font-bold text-white lg:text-m2">Recorded</div>
            ) : (
              times?.map((time, idx) => (
                <time
                  className="block pb-4 font-primary text-m1 font-bold text-white lg:text-m2"
                  key={`webinar-time-${webinar?.webinarKey}-${idx}`}
                >
                  {time}
                </time>
              ))
            )}
            <CallToAction href={webinar?.registrationUrl}>{webinar?.ctaLabel}</CallToAction>
          </div>
          {hasImage ? (
            <div className="relative -top-16 right-0 -mb-8 mr-3 h-full w-full self-end justify-self-end border-2 border-secondary-1 lg:-top-10 lg:-mb-0">
              <Image
                loader={null}
                src={webinar?.image}
                alt=""
                width={896}
                height={585}
                className="relative -right-3.5 -top-3.5 aspect-[896/505] w-full object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      {webinar?.description?.length > 0 ? (
        <section className="px-6 py-12 lg:py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="pb-8 text-primary-1 lg:text-center">Webinar Description</h2>
            <p>{webinar?.description}</p>
          </div>
        </section>
      ) : null}
    </>
  )
}
