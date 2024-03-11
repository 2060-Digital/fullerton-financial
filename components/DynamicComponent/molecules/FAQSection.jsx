import { useState } from "react"
import cn from "classnames"
import richText from "utilities/richText"
import Expand from "public/assets/expand.svg"

const Item = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mx-auto w-full bg-secondary-2 p-5 lg:p-7">
      <div className="flex cursor-pointer flex-row items-center gap-5" onClick={() => setExpanded(!expanded)}>
        <h3 className="grow !pb-0 text-primary-1">{title}</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="accordion-button shrink"
          aria-label="toggle accordion state"
        >
          <Expand className={cn({ expanded })} />
        </button>
      </div>
      <div
        className={cn("max-w-fit origin-top break-words leading-loose transition-transform lg:pr-20", {
          "max-h-0 scale-y-0 opacity-0": !expanded,
          "scale-y-1 opacity-1 max-h-full pt-2": expanded,
        })}
      >
        {richText(content)}
      </div>
    </div>
  )
}

export default function FAQSection({ blok }) {
  return (
    <section className="faq-section relative py-8">
      <h2 className="mb-6">{blok.heading}</h2>
      <div className="mx-auto flex max-w-screen-lg flex-col gap-8">
        {blok?.items?.map((item) => (
          <Item {...item} key={item?._uid} />
        ))}
      </div>
    </section>
  )
}
