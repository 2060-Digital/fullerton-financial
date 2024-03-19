import { Fragment } from "react"
import cn from "classnames"
import richText from "utilities/richText"

function Table({ title, additional_info, column_1_label, column_2_label, rows, idx }) {
  const labelStyles = "bg-primary-1 text-white py-1 px-2.5"
  const cellStyles = "bg-secondary-2 text-gray-charcoal py-1 px-2.5 font-primary text-gray-charcoal"

  return (
    <div className="basis-1/2">
      <h3 className="pb-4 text-primary-1">{title}</h3>
      <div className="grid grid-cols-2 gap-1 pb-4">
        <h4 className={labelStyles}>{column_1_label}</h4>
        <h4 className={labelStyles}>{column_2_label}</h4>
        {rows?.length
          ? rows?.map((row) => (
              <Fragment key={row?._uid}>
                <div className={cellStyles}>{row?.left}</div>
                <div className={cellStyles}>{row?.right}</div>
              </Fragment>
            ))
          : null}
      </div>
      <div className={cn({ "hidden md:block": idx === 0, "md:hidden": idx === 1 })}>{richText(additional_info)}</div>
    </div>
  )
}

export default function TablesAndContentSection({ blok }) {
  return (
    <section className="px-6 py-12 lg:py-20">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8 lg:flex-row lg:gap-24">
        <div className="lg:basis-1/3">
          <h2>
            {blok?.eyebrow ? <span className="eyebrow block pb-2.5 text-primary-1">{blok?.eyebrow}</span> : null}
            <span className="block pb-5 text-primary-1">{blok?.heading}</span>
          </h2>
          <div>{richText(blok?.content)}</div>
        </div>
        <div className="flex flex-col gap-7 md:flex-row lg:basis-2/3">
          {blok?.tables?.length
            ? blok?.tables?.map((table, idx) => (
                <Table {...table} key={table?._uid} additional_info={blok?.additional_info} idx={idx} />
              ))
            : null}
        </div>
      </div>
    </section>
  )
}
