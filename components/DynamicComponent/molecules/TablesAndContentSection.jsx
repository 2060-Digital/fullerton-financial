import richText from "utilities/richText"

function Table({ title, additional_info, column_1_label, column_2_label, rows }) {
  const labelStyles = "bg-primary-1 text-white py-1 px-2.5"
  const cellStyles = "bg-secondary-2 text-gray-charcoal py-1 px-2.5"
  return (
    <div className="basis-1/2">
      <h3 className="text-primary-1 pb-4">{title}</h3>
      <div className="grid grid-cols-2 gap-1 pb-4">
        <h4 className={labelStyles}>{column_1_label}</h4>
        <h4 className={labelStyles}>{column_2_label}</h4>
        {rows?.length
          ? rows?.map((row) => (
              <>
                <div className={cellStyles}>{row?.left}</div>
                <div className={cellStyles}>{row?.right}</div>
              </>
            ))
          : null}
      </div>
      <div>{richText(additional_info)}</div>
    </div>
  )
}

export default function TablesAndContentSection({ blok }) {
  return (
    <section className="px-6 py-12 lg:py-20">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-24 items-center">
        <div className="lg:basis-1/3">
          <h2>
            {blok?.eyebrow ? <span className="block text-primary-1 eyebrow pb-2.5">{blok?.eyebrow}</span> : null}
            <span className="pb-5 block text-primary-1">{blok?.heading}</span>
          </h2>
          <div>{richText(blok?.content)}</div>
        </div>
        <div className="flex flex-col md:flex-row lg:basis-2/3 gap-7">
          {blok?.tables?.length ? blok?.tables?.map((table) => <Table {...table} key={table?._uid} />) : null}
        </div>
      </div>
    </section>
  )
}
