import richText from "utilities/richText"

export default function LogoGridSection({ blok }) {
  return (
    <section className="px-6 py-12 lg:py-12">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-center">
          {blok?.eyebrow ? <span className="text-primary-1 block eyebrow pb-2.5">{blok?.eyebrow}</span> : null}
          <span className="pb-5 block text-primary-1">{blok?.heading}</span>
        </h2>
        <div className="max-w-4xl mx-auto">{richText(blok.content)}</div>
      </div>
    </section>
  )
}
