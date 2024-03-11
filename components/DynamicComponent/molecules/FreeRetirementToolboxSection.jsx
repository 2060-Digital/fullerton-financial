import Image from "components/Image"
import richText from "utilities/richText"

export default function FreeRetirementToolboxSection({ blok }) {
  return (
    <section className="px-6 py-12 lg:py-24">
      <div className="mx-auto max-w-screen-lg">
        <div className="mx-auto pb-8 text-center prose-p:text-m1 prose-p:font-bold prose-p:text-primary-1 prose-p:lg:text-m2">
          <h2>
            {blok?.eyebrow ? <span className="eyebrow block pb-2.5 text-primary-1">{blok?.eyebrow}</span> : null}
            <span className="block pb-5 text-primary-1">{blok?.heading}</span>
          </h2>
          {richText(blok?.intro_content)}
        </div>
        <div className="flex grid-cols-2 flex-col gap-8  lg:grid">
          <div className="basis-2/5 prose-a:mb-4">{richText(blok?.content)}</div>
          <Image
            src={blok?.image?.filename}
            alt={blok?.image?.alt}
            placeholder={blok?.image?.blurDataURL ? "blur" : "empty"}
            blurDataURL={blok?.image?.blurDataURL}
            width={633}
            height={486}
            className="basis-3/5 lg:row-span-2"
          />
          <div className="basis-2/5 prose-a:mb-4 prose-a:block sm:prose-a:w-max">
            {richText(blok?.below_image_content)}
          </div>
        </div>
      </div>
    </section>
  )
}
