import Link from "next/link"
import cn from "classnames"
import CallToAction from "components/CallToAction"
import Image from "components/Image"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import getTarget from "utilities/getTarget"
import Arrow from "public/assets/arrow.svg"
import useCarousel from "utilities/useCarousel"

function Logo({ url, image, visible }) {
  const href = getStoryblokLink(url)

  if (href) {
    return (
      <Link
        href={href}
        target={getTarget(href)}
        className={cn("min-w-28 transition-opacity duration-300", {
          "opacity-0 lg": !visible,
        })}
      >
        <Image src={image?.filename} alt={image?.alt} width={110} height={95} className="w-full object-contain" />
      </Link>
    )
  }

  return (
    <Image
      src={image?.filename}
      alt={image?.alt}
      width={110}
      height={95}
      className={cn("w-28 transition-opacity duration-300 object-contain", {
        "opacity-0 lg": !visible,
      })}
    />
  )
}

export default function LogoCarouselSection({ blok }) {
  const numLogos = blok?.logos?.length
  const { ref, visibleSlides, slideWidth, slideGap, offset, moveLeft, moveRight } = useCarousel(
    numLogos,
    156,
    44,
    numLogos,
  )

  return (
    <section className="py-12 lg:py-24 px-6 overflow-hidden">
      <div className="text-center mb-8">
        <h2>
          {blok?.eyebrow ? <span className="block eyebrow pb-2.5 text-primary-1">{blok?.eyebrow}</span> : null}
          <span className="pb-5 block text-primary-1">{blok?.heading}</span>
        </h2>
      </div>
      {numLogos ? (
        <div className="mb-12 mx-auto">
          <div
            ref={ref}
            className="flex gap-11 mx-auto transition-all duration-500"
            style={{
              width: `${visibleSlides * slideWidth - slideGap}px`,
              transform: `translateX(-${visibleSlides < numLogos ? offset : 0}px)`,
            }}
          >
            {blok?.logos?.map((logo, idx) => {
              const leftSlideIdx = offset / slideWidth
              const rightSlideIdx = leftSlideIdx + visibleSlides

              return (
                <Logo
                  {...logo}
                  visible={(idx >= leftSlideIdx && idx < rightSlideIdx) || visibleSlides >= numLogos}
                  key={logo?._uid}
                />
              )
            })}
          </div>
          {visibleSlides < numLogos ? (
            <div className="flex gap-8 mx-auto w-max mt-12">
              <button onClick={() => moveLeft()}>
                <Arrow className="rotate-180 text-tertiary-1" />
              </button>
              <button onClick={() => moveRight()}>
                <Arrow className="text-tertiary-1" />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      <CallToAction href={getStoryblokLink(blok?.link_url)} className="table mx-auto" style="secondary">
        {blok?.link_text}
      </CallToAction>
    </section>
  )
}
