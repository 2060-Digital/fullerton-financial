import Icon from "components/Icon"
import richText from "utilities/richText"

export default function IconCard({ blok }) {
  return (
    <div className="flex flex-col items-center border-2 border-secondary-1 p-10 lg:min-h-[260px]">
      <Icon icon={blok.icon} />
      <h3 className="py-1 text-center text-primary-1">{blok.heading}</h3>
      <div className="text-center prose-p:pb-0 prose-p:text-m1 prose-p:font-bold prose-p:text-primary-1">
        {richText(blok.content)}
      </div>
    </div>
  )
}
