import cn from "classnames"
import CallToAction from "components/CallToAction"
import Image from "components/Image"
import Meta from "components/Meta"

export default function WebinarPage({ webinar }) {
  const hasImage = Boolean(webinar?.image?.length)

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
          "mt-24 lg:mt-16 pl-6 lg:pl-0 pb-16 lg:pb-0": hasImage,
          "px-6 py-8 lg:py-12": !hasImage,
        })}
      >
        <div
          className={cn({
            "flex flex-col-reverse lg:flex-row lg:justify-between xl:pr-16 2xl:pr-32 lg:gap-12 max-w-screen-2xl mx-auto lg:py-6":
              hasImage,
            "max-w-screen-xl mx-auto": !hasImage,
          })}
        >
          <div
            className={cn({
              "lg:self-center justify-self-end max-w-96 pr-6 lg:pr-0 xl:mr-32 2xl:mr-0 lg:ml-6 xl:ml-[72px] 2xl:pl-12":
                hasImage,
            })}
          >
            <h1 className="text-white pb-4">{webinar?.subject}</h1>
            {webinar?.times?.map((time) => (
              <time
                className="text-white block font-primary font-bold text-m1 lg:text-m2 pb-4"
                key={`${time?.formatted}-webinar-${webinar?.webinarKey}`}
              >
                {time?.formatted}
              </time>
            ))}
            <CallToAction href={webinar?.registrationUrl}>{webinar?.ctaLabel}</CallToAction>
          </div>
          {hasImage ? (
            <div className="border-2 border-secondary-1 relative -top-16 lg:-top-10 right-0 w-full justify-self-end lg:max-w-[591px] self-end -mb-8 lg:-mb-0 h-full mr-3">
              <Image
                loader={null}
                src={webinar?.image}
                alt=""
                width={591}
                height={334}
                className="relative -right-3.5 -top-3.5 min-w-full"
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
