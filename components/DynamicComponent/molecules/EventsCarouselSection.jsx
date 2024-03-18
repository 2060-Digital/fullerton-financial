import cn from "classnames"
import useCarousel from "utilities/useCarousel"
import Arrow from "public/assets/arrow.svg"
import CallToAction from "components/CallToAction"

function Event({ name, venue, dates, signUpHREF, visible }) {
  return (
    <article
      className={cn("flex min-w-72 max-w-72 border border-secondary-1 px-5 py-14 transition-opacity duration-300", {
        "opacity-0": !visible,
      })}
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h3>
          <span className="block pb-4 font-primary text-base font-normal text-primary-1">{dates}</span>
          <span className="font-primary text-m1 font-bold text-primary-1 lg:text-m2">{name}</span>
        </h3>
        <address className="font-primary not-italic text-primary-1">{venue}</address>
        <CallToAction href={signUpHREF} style="secondary">
          Sign Up
        </CallToAction>
      </div>
    </article>
  )
}

export default function EventsCarouselSection({ blok }) {
  const numEvents = blok?.events?.length
  const { ref, visibleSlides, slideWidth, slideGap, offset, moveLeft, moveRight } = useCarousel(numEvents, 368, 80, 3)

  return (
    <section className="my-4 overflow-x-clip px-6 lg:my-16">
      <h2 className="pb-8 text-center text-primary-1 lg:pb-12">{blok?.heading}</h2>
      {numEvents ? (
        <div className="relative mx-auto max-w-screen-xl">
          <div
            ref={ref}
            className="mx-auto flex gap-20 transition-all duration-500"
            style={{
              width: `${visibleSlides * slideWidth - slideGap}px`,
              transform: `translateX(-${visibleSlides < numEvents ? offset : 0}px)`,
            }}
          >
            {blok?.events?.map((event, idx) => {
              const leftSlideIdx = offset / slideWidth
              const rightSlideIdx = leftSlideIdx + visibleSlides

              return (
                <Event
                  {...event}
                  visible={(idx >= leftSlideIdx && idx < rightSlideIdx) || visibleSlides >= numEvents}
                  key={event?.id}
                />
              )
            })}
          </div>
          {visibleSlides < numEvents ? (
            <div className="mx-auto mt-12 flex w-max gap-8 xl:static xl:mt-0">
              <button onClick={() => moveLeft()} className="left-0 top-1/2 -translate-y-1/2 xl:absolute">
                <Arrow className="rotate-180 text-tertiary-1" />
              </button>
              <button onClick={() => moveRight()} className="right-0 top-1/2 -translate-y-1/2 xl:absolute">
                <Arrow className="text-tertiary-1" />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
