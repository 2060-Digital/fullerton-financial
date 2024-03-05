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
            "lg:self-center justify-self-end max-w-96 pr-6 lg:pr-0 xl:mr-14 2xl:mr-12 lg:ml-6 xl:ml-[72px] 2xl:ml-[94px] 2xl:pl-8 lg:py-8 w-full":
              hasImage,
          })}
        >
          <h1 className="text-white pb-3">{event.name.text}</h1>
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
          <div className="border-2 border-secondary-1 relative -top-16 lg:-top-10 right-0 w-full justify-self-end self-end -mb-8 lg:-mb-0 h-full mr-3">
            <Image
              src={event?.logo?.original?.url}
              alt=""
              width={896}
              height={585}
              className="relative -right-3.5 -top-3.5 w-full aspect-[896/505] object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
