import cn from "classnames"
import Image from "components/Image"
import richText from "utilities/richText"

export default function TwoColumnSection({ blok }) {
  return (
    <section className="py-12 md:py-20 px-6">
      <div className="max-w-screen-lg mx-auto">
        <div className="mx-auto pb-8 max-w-screen-md">
          <h2 className="text-center">
            {blok?.eyebrow ? <span className="text-primary-1 block eyebrow pb-2.5">{blok?.eyebrow}</span> : null}
            <span className="pb-5 block text-primary-1">{blok?.heading}</span>
          </h2>
          <div className="md:text-center">{richText(blok?.intro_content)}</div>
        </div>
        <div
          className={cn("flex flex-col gap-8 ", {
            "md:flex-row-reverse": blok?.orientation === "content_first",
            "md:flex-row": blok?.orientation === "image_first",
          })}
        >
          <div className="basis-1/2 relative z-10 w-full h-full border-2 border-secondary-1 mt-4">
            <Image
              src={blok?.image?.filename}
              alt={blok?.image?.alt}
              placeholder={blok?.image?.blurDataURL ? "blur" : "empty"}
              blurDataURL={blok?.image?.blurDataURL}
              width={633}
              height={486}
              className="w-full relative -top-4 -right-4"
            />
          </div>
          <div className="basis-1/2 prose-a:mb-10 prose-headings:text-primary-1 prose-headings:mb-4 last:prose-a:mb-0">
            {richText(blok?.content)}
          </div>
        </div>
      </div>
    </section>
  )
}
