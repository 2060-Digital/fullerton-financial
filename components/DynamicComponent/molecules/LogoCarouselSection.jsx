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
          "lg pointer-events-none opacity-0": !visible,
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
      className={cn("w-28 object-contain transition-opacity duration-300", {
        "lg opacity-0": !visible,
      })}
    />
  )
}

export default function LogoCarouselSection({ blok }) {
  const numLogos = blok?.logos?.length
  const { ref, visibleSlides, slideWidth, slideGap, offset, moveLeft, moveRight } = useCarousel(numLogos, 156, 44, 7)

  return (
    <section className="logo-carousel-section overflow-hidden bg-secondary-2 px-6 py-12 lg:py-24">
      <div className="mb-8 text-center">
        <h2>
          {blok?.eyebrow ? <span className="eyebrow block pb-2.5 text-primary-1">{blok?.eyebrow}</span> : null}
          <span className="block pb-5 text-primary-1">{blok?.heading}</span>
        </h2>
      </div>
      {numLogos ? (
        <div className="mx-auto mb-12 max-w-[1400px] overflow-hidden xl:flex xl:items-center">
          <button onClick={() => moveLeft()} className="z-10 hidden p-4 xl:block">
            <Arrow className="rotate-180 text-tertiary-1 hover:text-secondary-1" />
          </button>
          <div
            ref={ref}
            className="mx-auto flex items-center gap-11 transition-all duration-500"
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
          <button onClick={() => moveRight()} className="z-10 hidden p-4 xl:block">
            <Arrow className="text-tertiary-1 hover:text-secondary-1" />
          </button>

          {visibleSlides < numLogos ? (
            <div className="mx-auto mt-12 flex w-max gap-8 xl:hidden">
              <button onClick={() => moveLeft()} className="p-4">
                <Arrow className="rotate-180 text-tertiary-1 hover:text-secondary-1" />
              </button>
              <button onClick={() => moveRight()} className="p-4">
                <Arrow className="text-tertiary-1 hover:text-secondary-1" />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
      <CallToAction href={getStoryblokLink(blok?.link_url)} className="mx-auto table" style="secondary">
        {blok?.link_text}
      </CallToAction>
    </section>
  )
}
