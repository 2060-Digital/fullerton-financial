import Icon from "components/Icon"
import richText from "utilities/richText"

export default function IconSection({ blok }) {
  return (
    <section className="my-12 px-6 lg:my-24">
      <div className="relative mx-auto max-w-screen-xl border-t-2 border-secondary-1 lg:border-x-2 lg:border-b-2">
        <Icon icon={blok?.icon} className="absolute -top-6 left-1/2 w-28 -translate-x-1/2 bg-white" />
        <div className="mx-auto max-w-screen-md pt-12 lg:pb-12">
          <h2 className="pb-7 text-center text-primary-1">{blok?.heading}</h2>
          <div className="lg:prose-p:text-center">{richText(blok?.content)}</div>
        </div>
      </div>
    </section>
  )
}
