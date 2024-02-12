import cn from "classnames"
import VenueLink from "components/Eventbrite/VenueLink"
import useCarousel from "utilities/useCarousel"
import Arrow from "public/assets/arrow.svg"
import RegisterNowLink from "components/Eventbrite/RegisterNowLink"
import Link from "next/link"
import useEventbriteModal from "eventbrite/useEventbriteModal"
import EventbriteModal from "components/Eventbrite/EventbriteModal"

function Event({ event, venue, visible }) {
  const { embedCreated, setEmbedCreated, modalProps, eventHash } = useEventbriteModal(event)

  return (
    <>
      <div
        className={cn("min-w-72 px-5 py-14 border border-secondary-1 transition-opacity duration-300", {
          "opacity-0": !visible,
        })}
      >
        <div className="text-center flex flex-col items-center justify-center gap-4">
          <Link href={event?.slug}>
            <h4 className="text-primary-1 pb-4">{event?.name?.html}</h4>
          </Link>
          <div className="text-primary-1 pb-4">
            <VenueLink event={event} venue={venue} />
          </div>
          <RegisterNowLink {...{ embedCreated, setEmbedCreated, eventHash, style: "secondary", label: "Sign Up" }} />
        </div>
      </div>
      <EventbriteModal {...modalProps} eventHash={eventHash} />
    </>
  )
}

export default function EventsCarouselSection({ blok }) {
  const numEvents = blok?.events?.length
  const { ref, visibleSlides, slideWidth, slideGap, offset, moveLeft, moveRight } = useCarousel(numEvents, 368, 80, 3)

  return (
    <section className="px-6 my-12 overflow-x-clip">
      <h2 className="text-center text-primary-1 pb-8 lg:pb-12">{blok?.heading}</h2>
      {numEvents ? (
        <div className="mx-auto relative max-w-screen-xl">
          <div
            ref={ref}
            className="flex gap-20 mx-auto transition-all duration-500"
            style={{
              width: `${visibleSlides * slideWidth - slideGap}px`,
              transform: `translateX(-${offset}px)`,
            }}
          >
            {blok?.events?.map((event, idx) => {
              const leftSlideIdx = offset / slideWidth
              const rightSlideIdx = leftSlideIdx + visibleSlides

              return (
                <Event
                  event={event}
                  venue={event?.venue}
                  visible={(idx >= leftSlideIdx && idx < rightSlideIdx) || visibleSlides >= numEvents}
                  key={event?.id}
                />
              )
            })}
          </div>
          {visibleSlides < numEvents ? (
            <div className="flex gap-8 mx-auto w-max mt-12 xl:mt-0 xl:static">
              <button onClick={() => moveLeft()} className="xl:absolute left-0 top-1/2 -translate-y-1/2">
                <Arrow className="rotate-180 text-tertiary-1" />
              </button>
              <button onClick={() => moveRight()} className="xl:absolute right-0 top-1/2 -translate-y-1/2">
                <Arrow className="text-tertiary-1" />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
