import cn from "classnames"
import Image from "components/Image"
import richText from "utilities/richText"
import DynamicComponent from "components/DynamicComponent"

export default function ImageAndContent({ blok }) {
  return (
    <section
      className={cn("image-and-content-section mb-12 lg:my-20 lg:px-6", {
        "prose-headings:text-white prose-p:text-white": blok?.background_color === "primary-1",
        "prose-headings:text-primary-1":
          blok?.background_color === "secondary-1" ||
          blok?.background_color === "gray-light" ||
          !blok?.background_color,
      })}
    >
      <div
        className={cn(
          blok?.background_color && `bg-${blok?.background_color}`,
          "image-and-content mx-auto max-w-screen-xl border-b-[80px] border-b-white px-6 py-8 lg:border-b-0 lg:py-10",
          {
            "lg:px-24": blok?.background_color,
            "lg:pl-24 lg:pr-0": !blok?.background_color,
            "bg-opacity-20": blok?.background_color === "secondary-1",
            "lg:border-l-[80px] lg:border-l-white": blok?.orientation === "image_first",
            "lg:border-r-[80px] lg:border-r-white": blok?.orientation === "content_first",
          },
        )}
      >
        <div
          className={cn("mx-auto flex max-w-screen-xl flex-col gap-8 lg:gap-0", {
            "justify-end lg:flex-row-reverse": blok?.orientation === "image_first",
            "lg:flex-row": blok?.orientation === "content_first",
          })}
        >
          <div className="lg:basis-5/12">
            <h2>
              {blok?.eyebrow ? <span className="eyebrow block pb-2.5">{blok?.eyebrow}</span> : null}
              <span className="block pb-5">{blok?.heading}</span>
            </h2>
            <div className="prose-h2:pb-5">{richText(blok?.content)}</div>
          </div>
          <div
            className={cn("relative h-full w-full pr-4 pt-4 lg:basis-7/12 lg:scale-110", {
              "lg:-left-32": blok?.orientation === "image_first",
              "lg:-right-32": blok?.orientation === "content_first",
              "lg:-mr-12": blok?.background_color === "",
            })}
          >
            <div className="image-and-content-image relative z-10 -mb-[120px] h-full w-full border-2 border-secondary-1 lg:-mb-0">
              <Image
                src={blok?.image?.filename}
                alt={blok?.image?.alt}
                placeholder={blok?.image?.blurDataURL ? "blur" : "empty"}
                blurDataURL={blok?.image?.blurDataURL}
                width={435}
                height={511}
                className="relative -right-4 -top-4 w-full"
              />
            </div>
          </div>
        </div>
        {blok?.nested_bloks?.length ? (
          <div className="nested-image-and-content-components">
            {blok?.nested_bloks?.map((blok) => (
              <DynamicComponent blok={blok} key={blok._uid} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
