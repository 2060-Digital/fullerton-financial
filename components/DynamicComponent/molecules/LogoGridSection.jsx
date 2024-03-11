import richText from "utilities/richText"
import Link from "next/link"
import Image from "next/image"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import getSbImageDimensions from "utilities/getSbImageDimensions.ts"

export default function LogoGridSection({ blok }) {
  return (
    <section className="px-6 py-12 lg:py-12">
      <div className="mx-auto max-w-screen-xl">
        <h2 className="lg:text-center">
          {blok?.eyebrow ? <span className="eyebrow block pb-2.5 text-primary-1">{blok?.eyebrow}</span> : null}
          <span className="block pb-5 text-primary-1">{blok?.heading}</span>
        </h2>
        <div className="mx-auto max-w-4xl pb-8">{richText(blok.content)}</div>
        <div className="grid grid-cols-2 justify-between gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-16">
          {blok?.logos?.map((logo) => {
            return (
              <Link key={logo._uid} href={getStoryblokLink(logo.url)}>
                <div className="flex h-full min-h-[108px] items-center justify-center border border-secondary-2 p-4 lg:min-h-[181px]">
                  {" "}
                  <Image
                    className=""
                    src={logo.image.filename}
                    alt="partner logo"
                    width={getSbImageDimensions("width", logo.image.filename)}
                    height={getSbImageDimensions("height", logo.image.filename)}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
