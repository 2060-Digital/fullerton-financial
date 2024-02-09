import cn from "classnames"
import Image from "components/Image"
import EventbriteModal from "components/Eventbrite/EventbriteModal"
import RegisterNowLink from "components/Eventbrite/RegisterNowLink"
import VenueLink from "components/Eventbrite/VenueLink"
import { formatEventStartEndTime, formatEventDate } from "eventbrite/formatEventDate"
import useEventbriteModal from "eventbrite/useEventbriteModal"

export default function PageHeader({ event }) {
  const { embedCreated, setEmbedCreated, modalProps, eventHash } = useEventbriteModal(event)

  const timeVenueStyles = "text-white block font-primary font-bold text-m1 lg:text-m2"
  const hasImage = Boolean(event?.logo?.original?.url?.length)

  return (
    <section
      className={cn("bg-primary-1", {
        "mt-24 lg:mt-16 pl-6 lg:pl-0 pb-16 lg:pb-0": hasImage,
        "px-6 py-8 lg:py-12": !hasImage,
      })}
    >
      <div
        className={cn({
          "flex flex-col-reverse lg:grid grid-cols-5 lg:gap-7": hasImage,
          "max-w-screen-xl mx-auto": !hasImage,
        })}
      >
        <div
          className={cn({
            "col-span-2 lg:self-center justify-self-end max-w-96 pr-6 lg:pr-0 xl:mr-32 lg:pl-6": hasImage,
          })}
        >
          <h1 className="text-white pb-3">{event.name.text}</h1>
          <time className={`${timeVenueStyles} pb-1`}>{formatEventDate(event?.start)}</time>
          <time className={`${timeVenueStyles} pb-4`}>{formatEventStartEndTime(event?.start, event?.end)}</time>
          <h4 className={`${timeVenueStyles} pb-4`}>
            <VenueLink event={event} venue={event?.venue} />
          </h4>
          <RegisterNowLink {...{ embedCreated, setEmbedCreated, eventHash }} />
          <EventbriteModal {...modalProps} eventHash={eventHash} />
        </div>
        {hasImage ? (
          <div className="border-2 border-secondary-1 relative -top-16 lg:-top-10 right-0 col-span-3 w-full lg:w-auto 2xl:w-max justify-self-end self-end -mb-8 lg:-mb-0 h-full mr-[12px]">
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
