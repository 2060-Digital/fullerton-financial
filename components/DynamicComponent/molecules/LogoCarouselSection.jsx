import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import cn from "classnames"
import CallToAction from "components/CallToAction"
import Image from "components/Image"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import getTarget from "utilities/getTarget"
import Arrow from "public/assets/arrow.svg"

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
  const ref = useRef(null)
  const [visibleSlides, setVisibleSlides] = useState(blok?.logos?.length)
  const [offset, setOffset] = useState(0)

  const slideWidth = 156
  const maxSliderWidth = slideWidth * blok?.logos?.length - 44

  useEffect(() => {
    function handleResize() {
      const parentElement = ref.current.parentElement
      if (parentElement) {
        setVisibleSlides(Math.min(Math.floor((parentElement.offsetWidth + 44) / 156), blok?.logos?.length))
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [blok])

  return (
    <section className="py-12 px-6">
      <div className="text-center mb-8">
        <h2>
          {blok?.eyebrow ? <span className="block eyebrow pb-2.5 text-primary-1">{blok?.eyebrow}</span> : null}
          <span className="pb-5 block text-primary-1">{blok?.heading}</span>
        </h2>
      </div>
      {blok?.logos?.length ? (
        <div className="mb-12 mx-auto">
          <div
            ref={ref}
            className="flex gap-11 mx-auto transition-all duration-500"
            style={{
              width: `${visibleSlides * slideWidth - 44}px`,
              transform: `translateX(-${visibleSlides < blok?.logos?.length ? offset : 0}px)`,
            }}
          >
            {blok?.logos?.map((logo, idx) => {
              const leftSlideIdx = offset / slideWidth
              const rightSlideIdx = leftSlideIdx + visibleSlides

              return (
                <Logo
                  {...logo}
                  visible={(idx >= leftSlideIdx && idx < rightSlideIdx) || visibleSlides >= blok?.logos?.length}
                  key={logo?._uid}
                />
              )
            })}
          </div>
          {visibleSlides < blok?.logos?.length ? (
            <div className="flex gap-8 mx-auto w-max mt-12">
              <button
                onClick={() => {
                  if (offset === 0) {
                    setOffset(maxSliderWidth - ref.current.offsetWidth)
                  } else {
                    setOffset(offset - slideWidth)
                  }
                }}
              >
                <Arrow className="rotate-180 text-tertiary-1" />
              </button>
              <button
                onClick={() => {
                  if (offset === maxSliderWidth - ref.current.offsetWidth) {
                    setOffset(0)
                  } else {
                    setOffset(offset + slideWidth)
                  }
                }}
              >
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
