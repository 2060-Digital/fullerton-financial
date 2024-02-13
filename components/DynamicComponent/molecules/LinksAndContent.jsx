import cn from "classnames"
import richText from "utilities/richText"
import CallToAction from "components/CallToAction"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function LinksAndContent({ blok }) {
  return (
    <section className="px-5 py-12 lg:py-20">
      <div className="max-w-screen-xl mx-auto">
        <div
          className={cn("flex flex-col gap-7 lg:gap-28", {
            "lg:flex-row-reverse": blok?.orientation === "links_first",
            "lg:flex-row": blok?.orientation === "content_first",
          })}
        >
          <div className="lg:basis-1/3">
            <div className="text-primary-1 eyebrow pb-3">{blok.eyebrow}</div>
            <h2 className="text-primary-1 pb-7">{blok.heading}</h2>
            <div>{richText(blok.content)}</div>
          </div>
          <div className="lg:basis-2/3 relative ml-5">
            <div className="w-full h-full absolute border-2 border-secondary-1 top-5 right-5 z-10"></div>
            <div className={`bg-${blok.background_color} h-full z-20 relative p-7 lg:px-14`}>
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 h-full content-center">
                {blok.links.map((link) => (
                  <CallToAction
                    key={link._uid}
                    style={blok.background_color === "primary-1" ? "secondary-white" : "secondary"}
                    href={getStoryblokLink(link.link)}
                    className="max-w-max whitespace-nowrap"
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
