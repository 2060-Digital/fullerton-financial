import cn from "classnames"
import Image from "components/Image"
import richText from "utilities/richText"

export default function TwoColumnSection({ blok }) {
  return (
    <section className="px-6 py-12 md:py-20">
      <div className="mx-auto max-w-screen-lg">
        <div className="mx-auto max-w-screen-md pb-8">
          <h2 className="text-center">
            {blok?.eyebrow ? <span className="eyebrow block pb-2.5 text-primary-1">{blok?.eyebrow}</span> : null}
            <span className="block pb-5 text-primary-1">{blok?.heading}</span>
          </h2>
          <div className="md:text-center">{richText(blok?.intro_content)}</div>
        </div>
        <div
          className={cn("flex flex-col gap-8 ", {
            "md:flex-row-reverse": blok?.orientation === "content_first",
            "md:flex-row": blok?.orientation === "image_first",
          })}
        >
          <div className="flex basis-1/2 items-center">
            <div className="relative z-10 mt-4 w-full border-2 border-secondary-1">
              <Image
                src={blok?.image?.filename}
                alt={blok?.image?.alt}
                placeholder={blok?.image?.blurDataURL ? "blur" : "empty"}
                blurDataURL={blok?.image?.blurDataURL}
                width={633}
                height={486}
                className="relative -right-4 -top-4 w-full"
              />
            </div>
          </div>

          <div className="basis-1/2 prose-headings:mb-4 prose-headings:text-primary-1 prose-a:mb-10 last:prose-a:mb-0">
            {richText(blok?.content)}
          </div>
        </div>
      </div>
    </section>
  )
}
