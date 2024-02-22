import cn from "classnames"
import WufooEmbed from "components/WufooEmbed"
import richText from "utilities/richText"

export default function FormEmbedSection({ blok }) {
  const layout = blok.content_placement

  return (
    <section className={`px-5 py-8 lg:py-16 relative`}>
      <div
        className={cn("relative max-w-screen-xl mx-auto", {
          "max-w-5xl w-full": layout === "top",
          "flex flex-col lg:flex-row lg:gap-7": layout === "side" || layout === "two-column",
        })}
      >
        <div
          className={cn("pb-8 text-primary prose-headings:text-primary-1 prose-headings:pb-7", {
            "text-center": layout === "top",
            "lg:basis-1/3": layout === "side",
            "lg:basis-1/2 prose-a:mb-4": layout === "two-column",
          })}
        >
          {richText(blok?.intro_content)}
        </div>
        <div
          className={cn({
            "max-w-4xl mx-auto": layout === "top",
            "w-full lg:basis-2/3": layout === "side",
            "order-first lg:basis-1/2": layout === "two-column",
          })}
        >
          <WufooEmbed formID={blok?.form_id} initialHeight={blok.initial_height} />
        </div>
      </div>
    </section>
  )
}
