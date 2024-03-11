import richText from "utilities/richText"
import CallToAction from "components/CallToAction"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function SidebarCTA({ blok }) {
  return (
    <section className="lg:px-6">
      <div className="mx-auto flex max-w-screen-xl flex-col pt-8 lg:flex-row lg:items-start lg:gap-16 lg:py-16">
        <div className="w-full px-6 pb-8 prose-headings:pb-6 prose-h2:text-primary-1 lg:basis-2/3 lg:px-0 lg:pb-0">
          {richText(blok.content)}
        </div>
        <aside
          className="bg-cover bg-center bg-no-repeat px-6 py-12 lg:sticky lg:top-8 lg:basis-1/3"
          style={{ backgroundImage: `url(${blok?.sidebar_background?.filename})` }}
        >
          <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8" data-pagefind-ignore>
            <h2 className="text-center text-xl1 text-primary-2">{blok.sidebar_heading}</h2>
            <CallToAction href={getStoryblokLink(blok.sidebar_link)}>{blok.sidebar_link_label}</CallToAction>
          </div>
        </aside>
      </div>
    </section>
  )
}
