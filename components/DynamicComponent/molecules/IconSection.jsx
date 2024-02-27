import Icon from "components/Icon"
import richText from "utilities/richText"

export default function IconSection({ blok }) {
  return (
    <section className="px-6 my-12 lg:my-24">
      <div className="max-w-screen-xl mx-auto border-secondary-1 border-t-2 lg:border-x-2 lg:border-b-2 relative">
        <Icon icon={blok?.icon} className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white w-28" />
        <div className="max-w-screen-md mx-auto pt-12 lg:pb-12">
          <h2 className="text-center text-primary-1 pb-7">{blok?.heading}</h2>
          <div className="lg:prose-p:text-center">{richText(blok?.content)}</div>
        </div>
      </div>
    </section>
  )
}
