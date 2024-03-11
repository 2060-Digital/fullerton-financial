import cn from "classnames"
import { format } from "date-fns"
import Image from "next/image"
import EventbriteModal from "components/Eventbrite/EventbriteModal"
import RegisterNowLink from "components/Eventbrite/RegisterNowLink"
import VenueLink from "components/Eventbrite/VenueLink"
import useEventbriteModal from "eventbrite/useEventbriteModal"

export default function PageHeader({ event }) {
  const { embedCreated, setEmbedCreated, modalProps, eventHash } = useEventbriteModal(event)

  const timeVenueStyles = "text-white block font-primary font-bold text-m1 lg:text-m2"
  const hasImage = Boolean(event?.logo?.original?.url?.length)

  return (
    <section
      className={cn("bg-primary-1", {
        "mt-24 pb-16 pl-6 lg:mt-16 lg:pb-0 lg:pl-0": hasImage,
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
            "max-w-96 justify-self-end py-6 pr-6 lg:ml-6 lg:self-center lg:pr-0 xl:ml-[72px] xl:mr-32 2xl:mr-0 2xl:pl-12":
              hasImage,
          })}
        >
          <h1 className="pb-3 text-white">{event.name.text}</h1>
          <time className={`${timeVenueStyles} pb-1`}>{format(event?.start, "EEEE, LLLL do")}</time>
          <time className={`${timeVenueStyles} pb-4`}>
            {format(event?.start, "p")} - {format(event?.end, "p")}
          </time>
          <h4 className={`${timeVenueStyles} pb-4`}>
            <VenueLink event={event} venue={event?.venue} />
          </h4>
          <RegisterNowLink {...{ embedCreated, setEmbedCreated, eventHash }} />
          <EventbriteModal {...modalProps} eventHash={eventHash} />
        </div>
        {hasImage ? (
          <div className="relative -top-16 right-0 -mb-8 mr-3 h-full w-full self-end justify-self-end border-2 border-secondary-1 lg:-top-10 lg:-mb-0">
            <Image
              src={event?.logo?.original?.url}
              alt=""
              width={896}
              height={585}
              className="relative -right-3.5 -top-3.5 w-full"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
