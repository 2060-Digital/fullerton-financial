import { useState } from "react"
import cn from "classnames"
import richText from "utilities/richText"
import Expand from "public/assets/expand.svg"

const Item = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mx-auto py-8 w-full bg-secondary-2">
      <div className="flex flex-row items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <h3 className="grow !pb-0">{title}</h3>
        <button onClick={() => setExpanded(!expanded)} className="shrink" aria-label="toggle accordion state">
          <span
            className={cn("text-black hover:text-green w-[85px]", {
              "transition rotate-45 duration-300": expanded,
              "transition rotate-90 duration-300": !expanded,
            })}
          >
            <Expand />
          </span>
        </button>
      </div>
      <div
        className={cn("leading-loose max-w-fit transition-transform origin-top break-words", {
          "max-h-0 scale-y-0 opacity-0": !expanded,
          "max-h-full scale-y-1 opacity-1": expanded,
        })}
        inert={!expanded ? "" : null}
      >
        {richText(content)}
      </div>
    </div>
  )
}

export default function FAQSection({ blok }) {
  return (
    <section className="py-8 relative">
      <h2 className="pb-12">{blok.heading}</h2>
      <div className="mx-auto max-w-screen-lg px-4 lg:px-0">
        {blok.items ? blok.items.map((item) => <Item {...item} key={item._uid} />) : null}
      </div>
    </section>
  )
}
