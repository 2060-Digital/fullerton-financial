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
        className="py-12 lg:py-16 px-6 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${blok?.background_image?.filename})` }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col gap-8 items-center">
          <h2 className="text-center text-primary-2 text-xl1 lg:text-xl2">{blok.heading}</h2>
          <CallToAction href={getStoryblokLink(blok.link)}>{blok.label}</CallToAction>
        </div>
      </div>
    </aside>
  )
}
