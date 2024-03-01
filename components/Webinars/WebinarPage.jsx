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
          "mt-24 lg:mt-16 pl-6 lg:pl-0 pb-12 sm:pb-16 lg:pb-0": hasImage,
          "px-6 py-8 lg:py-12": !hasImage,
        })}
      >
        <div
          className={cn({
            "flex flex-col-reverse lg:flex-row lg:gap-12 max-w-screen-2xl mx-auto": hasImage,
            "max-w-screen-xl mx-auto": !hasImage,
          })}
        >
          <div
            className={cn({
              "lg:self-center justify-self-end max-w-md pr-6 lg:pr-0 xl:mr-14 2xl:mr-12 lg:ml-6 xl:ml-[72px] 2xl:ml-[94px] 2xl:pl-8 lg:py-8 w-full":
                hasImage,
            })}
          >
            <h1 className="text-white pb-4">{webinar?.subject}</h1>
            {onDemand ? (
              <div className="text-white block font-primary font-bold text-m1 lg:text-m2 pb-4">Recorded</div>
            ) : (
              times?.map((time, idx) => (
                <time
                  className="text-white block font-primary font-bold text-m1 lg:text-m2 pb-4"
                  key={`webinar-time-${webinar?.webinarKey}-${idx}`}
                >
                  {time?.formatted}
                </time>
              ))
            )}
            <CallToAction href={webinar?.registrationUrl}>{webinar?.ctaLabel}</CallToAction>
          </div>
          {hasImage ? (
            <div className="border-2 border-secondary-1 relative -top-16 lg:-top-10 right-0 w-full lg:w-auto justify-self-end self-end -mb-8 lg:-mb-0 h-full mr-3">
              <Image
                loader={null}
                src={webinar?.image}
                alt=""
                width={896}
                height={585}
                className="relative -right-3.5 -top-3.5 w-full aspect-[896/505] object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      {webinar?.description?.length > 0 ? (
        <section className="px-6 py-12 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="lg:text-center pb-8 text-primary-1">Webinar Description</h2>
            <p>{webinar?.description}</p>
          </div>
        </section>
      ) : null}
    </>
  )
}
