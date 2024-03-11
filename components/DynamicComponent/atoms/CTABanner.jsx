import CallToAction from "components/CallToAction"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function CTABanner({
  blok = {
    link: {
      linktype: "story",
      story: {
        full_slug: "contact",
      },
    },
    label: "Schedule a Meeting",
    heading: "Ready to get started?",
    background_image: { filename: "https://a-us.storyblok.com/f/1017266/1440x283/9383e37db4/fullerton-cta-bar.webp" },
  },
}) {
  return (
    <aside className="cta-banner-section" data-pagefind-ignore>
      <div
        className="bg-cover bg-no-repeat px-6 py-12 lg:py-16"
        style={{ backgroundImage: `url(${blok?.background_image?.filename})` }}
      >
        <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8">
          <h2 className="text-center text-xl1 text-primary-2 lg:text-xl2">{blok.heading}</h2>
          <CallToAction href={getStoryblokLink(blok.link)}>{blok.label}</CallToAction>
        </div>
      </div>
    </aside>
  )
}
