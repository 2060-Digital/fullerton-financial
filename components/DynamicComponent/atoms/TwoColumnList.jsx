import richText from "utilities/richText"

export default function TwoColumnList({ blok }) {
  return (
    <div className="pb-3 @container prose-p:text-left prose-li:break-before-avoid @2xl:prose-ul:columns-2">
      {richText(blok.list)}
    </div>
  )
}
