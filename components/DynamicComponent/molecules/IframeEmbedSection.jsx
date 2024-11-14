export default function IframeEmbedSection({ blok }) {
  return (
    <section className={`px-5 py-8 lg:py-16`}>
      <div className="mx-auto max-w-screen-xl">
        <iframe src={blok?.src?.url} height={blok.initial_height} className="w-full" />
      </div>
    </section>
  )
}
