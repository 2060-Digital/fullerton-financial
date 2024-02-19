import richText from "utilities/richText"

export default function TwoColumnList({ blok }) {
  return (
    <div className="@container @2xl:prose-ul:columns-2 prose-li:break-before-avoid pb-5 prose-p:text-left">
      {richText(blok.list)}
    </div>
  )
}
