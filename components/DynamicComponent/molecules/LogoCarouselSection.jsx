import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import CallToAction from "components/CallToAction"
import Image from "components/Image"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import getTarget from "utilities/getTarget"

function Logo({ url, image }) {
  const href = getStoryblokLink(url)

  if (href) {
    return (
      <Link href={href} target={getTarget(href)}>
        <Image src={image?.filename} alt={image?.alt} width={110} height={95} />
      </Link>
    )
  }

  return <Image src={image?.filename} alt={image?.alt} width={110} height={95} className="w-28 object-contain" />
}

export default function LogoCarouselSection({ blok }) {
  const ref = useRef(null)
  const [visibleSlides, setVisibleSlides] = useState(2)

  const slideWidth = 156

  useEffect(() => {
    function handleResize() {
      const parentElement = ref.current.parentElement
      if (parentElement) {
        if (ref.current.offsetWidth <= parentElement.offsetWidth) {
          setVisibleSlides(blok?.logos?.length)
        } else {
          setVisibleSlides(Math.floor((parentElement.offsetWidth + 44) / 156))
        }
      }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
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
        <div className="mb-12">
          <div
            ref={ref}
            className="flex gap-11 mx-auto overflow-hidden"
            style={{ width: `${visibleSlides * slideWidth - 44}px` }}
          >
            {blok?.logos?.map((logo) => (
              <Logo {...logo} key={logo?._uid} />
            ))}
          </div>
        </div>
      ) : null}
      <CallToAction href={getStoryblokLink(blok?.link_url)} className="table mx-auto" style="secondary">
        {blok?.link_text}
      </CallToAction>
    </section>
  )
}
