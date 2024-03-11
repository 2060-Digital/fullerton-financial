import richText from "utilities/richText"

export default function TwoColumnTextSection({ blok }) {
  const columnStyles = `bg-${blok.column_background_color} p-9 md:p-16 lg:p-24 prose-headings:text-primary-1 prose-headings:pb-4 md:prose-headings:pb-6`

  return (
    <section className="px-6 py-12 md:my-24">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-7 md:flex-row">
          <div className={columnStyles}>{richText(blok?.column_one_content)}</div>
          <div className={columnStyles}>{richText(blok?.column_two_content)}</div>
        </div>
      </div>
    </section>
  )
}
