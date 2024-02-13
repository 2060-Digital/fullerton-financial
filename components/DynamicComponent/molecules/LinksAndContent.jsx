import cn from "classnames"
import richText from "utilities/richText"
import DynamicComponent from ".."
import CallToAction from "components/CallToAction"

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
          <div className="lg:basis-2/3 relative">
            <div className="w-full h-full absolute border-2 border-secondary-1 top-5 right-5 z-10"></div>
            <div className={`bg-${blok.background_color} h-full z-20 relative flex flex-col p-7`}>
              {blok.links.map((link) => (
                <CallToAction key={link._uid} blok={link} style="secondary" className="max-w-max">
                  {link.label}
                </CallToAction>
                // <DynamicComponent key={link._uid} blok={link} className="max-w-max" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
