import cn from "classnames"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import WufooEmbed from "components/WufooEmbed"

export default function FormEmbedSection({ blok }) {
  return (
    <section className={`bg-${blok.background_color} px-5 py-8 lg:py-16 relative`}>
      <div className={`relative max-w-5xl mx-auto form-brackets form-brackets-${blok.background_color}`}>
        <h2
          className={cn("pb-8 lg:pb-16 text-primary text-center", {
            "text-white": blok.background_color === "primary",
          })}
        >
          {blok?.heading}
        </h2>
        <div className="max-w-4xl mx-auto">
          <WufooEmbed formURL={getStoryblokLink(blok?.jotform_url)} initialHeight={800} />
        </div>
      </div>
    </section>
  )
}
