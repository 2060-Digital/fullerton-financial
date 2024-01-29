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
  },
}) {
  return (
    <section className="py-12 lg:py-16 px-6 bg-cta-banner bg-cover bg-no-repeat cta-banner-section">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-8 items-center">
        <h2 className="text-center text-primary-2 text-xl1 lg:text-xl2">{blok.heading}</h2>
        <CallToAction href={getStoryblokLink(blok.link)}>{blok.label}</CallToAction>
      </div>
    </section>
  )
}
