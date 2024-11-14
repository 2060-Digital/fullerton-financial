import cn from "classnames"
import WufooEmbed from "components/WufooEmbed"
import richText from "utilities/richText"

export default function FormEmbedSection({ blok }) {
  const layout = blok.content_placement

  return (
    <section className={`relative px-5 py-8 lg:py-16`}>
      <div
        className={cn("relative mx-auto max-w-screen-xl", {
          "w-full max-w-5xl": layout === "top",
          "flex flex-col lg:flex-row lg:gap-7": layout === "side" || layout === "two-column",
        })}
      >
        <div
          className={cn("text-primary pb-8 prose-headings:pb-7 prose-headings:text-primary-1", {
            "text-center": layout === "top",
            "lg:basis-1/3": layout === "side",
            "prose-a:mb-4 lg:basis-1/2": layout === "two-column",
          })}
        >
          {richText(blok?.intro_content)}
        </div>
        <div
          className={cn({
            "mx-auto max-w-4xl": layout === "top",
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
