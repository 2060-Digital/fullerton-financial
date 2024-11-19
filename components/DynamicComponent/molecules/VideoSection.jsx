import DynamicVideo from "components/DynamicVideo"

export default function VideoSection({ blok }) {
  return (
    <section className="px-5 py-8">
      <div className="mx-auto max-w-screen-xl">
        <DynamicVideo {...blok?.video[0]} />
      </div>
    </section>
  )
}
