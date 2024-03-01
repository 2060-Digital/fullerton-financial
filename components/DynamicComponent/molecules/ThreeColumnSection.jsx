import richText from "utilities/richText"
import DynamicComponent from ".."
import isRichTextValid from "utilities/isRichTextValid"

export default function ThreeColumnSection({ blok }) {
  return (
    <section className="px-5 py-12 lg:py-20">
      <div className="three-column-section mx-auto">
        {blok?.eyebrow || blok?.heading || isRichTextValid(blok?.content) ? (
          <div className="max-w-screen-md mx-auto mb-12 lg:mb-14">
            {blok?.eyebrow ? <div className="text-center text-primary-1 eyebrow pb-3">{blok.eyebrow}</div> : null}
            {blok?.heading ? <h2 className="text-center text-primary-1 pb-3">{blok.heading}</h2> : null}
            <div className="text-center">{richText(blok.content)}</div>
          </div>
        ) : null}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
          {blok.cards.map((card) => (
            <DynamicComponent key={blok._uid} blok={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
