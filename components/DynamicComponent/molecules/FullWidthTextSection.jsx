import richText from "utilities/richText"

export default function FullWidthTextSection({ blok }) {
  return (
    <section className={`px-5 py-8`}>
      <div className="mx-auto max-w-screen-xl">
        <div className="text-primary prose-headings:pb-7 prose-headings:text-primary-1 prose-a:mb-4">
          {richText(blok.content)}
        </div>
      </div>
    </section>
  )
}
