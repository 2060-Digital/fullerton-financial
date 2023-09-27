import { useState } from "react"
import cn from "classnames"
import richText from "utilities/richText"

const Item = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false)

  const plusStyles = cn("text-black hover:text-green w-[85px]", {
    "transition rotate-45 duration-300": expanded,
    "transition rotate-90 duration-300": !expanded,
  })

  const dynamicContent = cn(
    "faq-section-content leading-loose max-w-fit transition-transform origin-top break-words prose",
    {
      "max-h-0 scale-y-0 opacity-0": !expanded,
      "max-h-full scale-y-1 opacity-1": expanded,
    }
  )

  return (
    <div className="mx-auto py-8 border-y w-full">
      <div className="flex flex-row items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <h3 className="grow">{title}</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="faq-section-btn shrink"
          aria-label="toggle accordion state"
        >
          <span className={plusStyles}>+</span>
        </button>
      </div>
      <div className={dynamicContent} inert={!expanded ? "" : null}>
        {richText(content)}
      </div>
    </div>
  )
}

export default function FAQSection({ blok }) {
  return (
    <section className="faq-section pt-2 pb-24 relative">
      <h2 className="text-center pb-12">{blok.heading}</h2>
      <div className="faq-section-container mx-auto max-w-screen-lg px-4 lg:px-0">
        {blok.items ? blok.items.map((item) => <Item {...item} key={item._uid} />) : null}
      </div>
    </section>
  )
}
