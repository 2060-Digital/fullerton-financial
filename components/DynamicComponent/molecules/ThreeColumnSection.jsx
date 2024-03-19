import richText from "utilities/richText"
import DynamicComponent from ".."
import isRichTextValid from "utilities/isRichTextValid"

export default function ThreeColumnSection({ blok }) {
  return (
    <section className="px-5 py-12 lg:my-14 lg:py-6">
      <div className="three-column-section mx-auto">
        {blok?.eyebrow || blok?.heading || isRichTextValid(blok?.content) ? (
          <div className="mx-auto mb-6 max-w-screen-md lg:mb-12">
            {blok?.eyebrow ? <div className="eyebrow pb-3 text-center text-primary-1">{blok.eyebrow}</div> : null}
            {blok?.heading ? <h2 className="pb-3 text-center text-primary-1">{blok.heading}</h2> : null}
            <div className="text-center">{richText(blok.content)}</div>
          </div>
        ) : null}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-16">
          {blok.cards.map((card) => (
            <DynamicComponent key={blok._uid} blok={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
