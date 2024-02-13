import cn from "classnames"
import useCarousel from "utilities/useCarousel"
import Arrow from "public/assets/arrow.svg"
import CallToAction from "components/CallToAction"

function Event({ name, venue, dates, signUpHREF, visible }) {
  return (
    <article
      className={cn("min-w-72 px-5 py-14 border border-secondary-1 transition-opacity duration-300", {
        "opacity-0": !visible,
      })}
    >
      <div className="text-center flex flex-col items-center justify-center gap-4">
        <h3>
          <span className="text-base font-normal font-primary pb-4 block text-primary-1">{dates}</span>
          <span className="text-primary-1 font-primary font-bold text-m1 lg:text-m2">{name}</span>
        </h3>
        <address className="text-primary-1 not-italic">{venue}</address>
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
    <section className="px-6 my-12 lg:my-24 overflow-x-clip">
      <h2 className="text-center text-primary-1 pb-8 lg:pb-12">{blok?.heading}</h2>
      {numEvents ? (
        <div className="mx-auto relative max-w-screen-xl">
          <div
            ref={ref}
            className="flex gap-20 mx-auto transition-all duration-500"
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
