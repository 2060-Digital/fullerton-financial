import richText from "utilities/richText"
import CallToAction from "components/CallToAction"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function SidebarCTA({ blok }) {
  return (
    <section className="lg:px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:items-start lg:gap-16 pt-8 lg:py-16">
        <div className="lg:basis-2/3 prose-h2:text-primary-1 prose-headings:pb-6 px-6 lg:px-0 pb-8 lg:pb-0 w-full">
          {richText(blok.content)}
        </div>
        <aside
          className="lg:basis-1/3 py-12 px-6 bg-cover bg-no-repeat bg-center lg:sticky lg:top-8"
          style={{ backgroundImage: `url(${blok?.sidebar_background?.filename})` }}
        >
          <div className="max-w-screen-xl mx-auto flex flex-col gap-8 items-center">
            <h2 className="text-center text-primary-2 text-xl1">{blok.sidebar_heading}</h2>
            <CallToAction href={getStoryblokLink(blok.sidebar_link)}>{blok.sidebar_link_label}</CallToAction>
          </div>
        </aside>
      </div>
    </section>
  )
}
