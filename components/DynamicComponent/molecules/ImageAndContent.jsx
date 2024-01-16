import cn from "classnames"
import Image from "components/Image"
import richText from "utilities/richText"
import DynamicComponent from "components/DynamicComponent"

export default function ImageAndContent({ blok }) {
  return (
    <section
      className={cn("lg:px-6 lg:my-20", {
        "prose-headings:text-white prose-p:text-white": blok?.background_color === "primary-1",
        "prose-headings:text-primary-1": blok?.background_color === "secondary-1" || blok?.background_color === "gray",
      })}
    >
      <div
        className={cn(
          blok?.background_color && `bg-${blok?.background_color}`,
          "px-6 lg:px-24 py-12 lg:py-20 mx-auto max-w-screen-xl",
          {
            "bg-opacity-20": blok?.background_color === "secondary-1",
            "lg:border-l-[80px] lg:border-l-white": blok?.orientation === "image_first",
            "lg:border-r-[80px] lg:border-r-white": blok?.orientation === "content_first",
          },
        )}
      >
        <div
          className={cn("flex flex-col gap-8 lg:gap-0 items-center mx-auto max-w-screen-xl", {
            "lg:flex-row-reverse justify-end": blok?.orientation === "image_first",
            "lg:flex-row": blok?.orientation === "content_first",
          })}
        >
          <div className="lg:basis-5/12">
            <h2>
              {blok?.eyebrow ? <span className="block eyebrow pb-2.5">{blok?.eyebrow}</span> : null}
              <span className="pb-5 block">{blok?.heading}</span>
            </h2>
            <div className="">{richText(blok?.content)}</div>
          </div>
          <div
            className={cn("w-full h-full lg:basis-7/12 relative pr-4 pt-4 lg:scale-110", {
              "lg:-left-32": blok?.orientation === "image_first",
              "lg:-right-32": blok?.orientation === "content_first",
            })}
          >
            <div className="relative z-10 w-full h-full border-2 border-secondary-1">
              <Image
                src={blok?.image?.filename}
                alt={blok?.image?.alt}
                placeholder={blok?.image?.blurDataURL ? "blur" : "empty"}
                blurDataURL={blok?.image?.blurDataURL}
                width={435}
                height={511}
                className="w-full relative -top-4 -right-4"
              />
            </div>
          </div>
        </div>
        {blok?.nested_bloks?.length ? (
          <>
            {blok?.nested_bloks?.map((blok) => (
              <DynamicComponent blok={blok} key={blok._uid} />
            ))}
          </>
        ) : null}
      </div>
    </section>
  )
}
