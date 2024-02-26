import richText from "utilities/richText"
import Link from "next/link"
import Image from "next/image"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import getSbImageDimensions from "utilities/getSbImageDimensions.ts"

export default function LogoGridSection({ blok }) {
  return (
    <section className="px-6 py-12 lg:py-12">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="lg:text-center">
          {blok?.eyebrow ? <span className="text-primary-1 block eyebrow pb-2.5">{blok?.eyebrow}</span> : null}
          <span className="pb-5 block text-primary-1">{blok?.heading}</span>
        </h2>
        <div className="max-w-4xl mx-auto pb-8">{richText(blok.content)}</div>
        <div className="grid grid-cols-2 gap-4 lg:gap-16 md:grid-cols-3 lg:grid-cols-4 justify-between">
          {blok?.logos?.map((logo) => {
            return (
              <Link key={logo._uid} href={getStoryblokLink(logo.url)}>
                <div className="border border-secondary-2 min-h-[108px] lg:min-h-[181px] p-4 h-full flex items-center justify-center">
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
