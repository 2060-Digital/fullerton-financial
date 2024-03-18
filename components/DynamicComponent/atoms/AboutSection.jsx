import richText from "utilities/richText"

export default function AboutSection({ blok }) {
  return (
    <section className="bg-primary-1 bg-harvest">
      <div className="px-6 py-12 lg:py-24 max-w-screen-md mx-auto md:text-center">
        <h2 className="text-white pb-4">{blok?.heading}</h2>
        <div className="text-white prose-p:text-white prose-headings:text-white">{richText(blok?.content)}</div>
      </div>
    </section>
  )
}
