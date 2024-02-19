import cn from "classnames"
import WufooEmbed from "components/WufooEmbed"
import richText from "utilities/richText"

export default function FormEmbedSection({ blok }) {
  return (
    <section className={`px-5 py-8 lg:py-16 relative`}>
      <div
        className={cn("relative max-w-screen-xl mx-auto", {
          "max-w-5xl w-full": blok.content_placement === "top",
          "flex flex-col lg:flex-row lg:gap-7": blok.content_placement === "side",
        })}
      >
        <div
          className={cn("pb-8 lg:pb-16 text-primary prose-headings:text-primary-1 prose-headings:pb-7", {
            "text-center": blok.content_placement === "top",
            "lg:basis-1/3": blok.content_placement === "side",
          })}
        >
          {richText(blok?.intro_content)}
        </div>
        <div
          className={cn({
            "max-w-4xl mx-auto": blok.content_placement === "top",
            "w-full lg:basis-2/3": blok.content_placement === "side",
          })}
        >
          <WufooEmbed formID={blok?.form_id} initialHeight={blok.initial_height} />
        </div>
      </div>
    </section>
  )
}
