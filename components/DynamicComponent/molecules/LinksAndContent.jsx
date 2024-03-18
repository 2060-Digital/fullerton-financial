import cn from "classnames"
import richText from "utilities/richText"
import CallToAction from "components/CallToAction"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function LinksAndContent({ blok }) {
  return (
    <section className="px-5 py-12 lg:py-20">
      <div className="mx-auto max-w-screen-xl">
        <div
          className={cn("flex flex-col gap-7 lg:gap-28", {
            "lg:flex-row-reverse": blok?.orientation === "links_first",
            "lg:flex-row": blok?.orientation === "content_first",
          })}
        >
          <div className="lg:basis-1/3">
            <div className="eyebrow pb-3 text-primary-1">{blok.eyebrow}</div>
            <h2 className="pb-7 text-primary-1">{blok.heading}</h2>
            <div>{richText(blok.content)}</div>
          </div>
          <div className="relative ml-5 lg:basis-2/3">
            <div className="absolute right-5 top-5 z-10 h-full w-full border-2 border-secondary-1"></div>
            <div className={`bg-${blok.background_color} relative z-20 h-full p-7 lg:px-14`}>
              <div className="grid h-full content-center gap-6 lg:grid-cols-2 lg:gap-10">
                {blok.links.map((link) => (
                  <CallToAction
                    key={link._uid}
                    style={blok.background_color === "primary-1" ? "secondary-white" : "secondary"}
                    href={getStoryblokLink(link.link)}
                    className="max-w-max lg:whitespace-nowrap"
                  >
                    {link.label}
                  </CallToAction>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
