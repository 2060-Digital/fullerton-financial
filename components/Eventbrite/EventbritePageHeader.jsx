import Image from "components/Image"
import EventbriteModal from "components/Eventbrite/EventbriteModal"
import RegisterNowLink from "components/Eventbrite/RegisterNowLink"
import { formatEventStartEndTime, formatEventDate } from "eventbrite/formatEventDate"
import Link from "next/link"

export default function PageHeader({
  heading,
  image,
  time,
  venue,
  modalProps,
  eventHash,
  embedCreated,
  setEmbedCreated,
}) {
  const timeVenueStyles = "text-white block font-primary font-bold text-m1 lg:text-m2"

  return (
    <section className="bg-primary-1 mt-24 lg:mt-16 pl-6 lg:pl-0 pb-16 lg:pb-0">
      <div className="flex flex-col-reverse lg:grid grid-cols-5 lg:gap-7">
        <div className="col-span-2 lg:self-center justify-self-end max-w-96 pr-6 lg:pr-0 xl:mr-32 lg:pl-6">
          <h1 className="text-white pb-3">{heading}</h1>
          <time className={`${timeVenueStyles} pb-1`}>{formatEventDate(time?.start)}</time>
          <time className={`${timeVenueStyles} pb-4`}>{formatEventStartEndTime(time?.start, time?.end)}</time>
          <Link href={venue?.slug} className={`${timeVenueStyles} pb-4 hover:underline w-max`}>
            {venue?.name}
          </Link>
          <RegisterNowLink {...{ embedCreated, setEmbedCreated, eventHash }} />
          <EventbriteModal {...modalProps} eventHash={eventHash} />
        </div>
        <div className="border-2 border-secondary-1 relative -top-16 lg:-top-10 right-0 col-span-3 w-full lg:w-auto 2xl:w-max justify-self-end self-end -mb-8 lg:-mb-0 h-full mr-[12px]">
          <Image
            src={image?.filename}
            alt={image?.alt}
            width={896}
            height={585}
            className="relative -right-3.5 -top-3.5 w-full"
          />
        </div>
      </div>
    </section>
  )
}
