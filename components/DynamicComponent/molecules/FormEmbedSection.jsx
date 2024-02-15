import cn from "classnames"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import WufooEmbed from "components/WufooEmbed"
import richText from "utilities/richText"

export default function FormEmbedSection({ blok }) {
  return (
    <section className={`px-5 py-8 lg:py-16 relative`}>
      <div className={`relative max-w-5xl mx-auto`}>
        <div className={cn("pb-8 lg:pb-16 text-primary text-center")}>{richText(blok?.intro_content)}</div>
        <div className="max-w-4xl mx-auto">
          <WufooEmbed formID={blok?.form_id} initialHeight={blok.initial_height} />
        </div>
      </div>
    </section>
  )
}
