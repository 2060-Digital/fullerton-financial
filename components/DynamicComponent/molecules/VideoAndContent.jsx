import cn from "classnames"
import DynamicVideo from "components/DynamicVideo"
import richText from "utilities/richText"

export default function VideoAndContent({ blok }) {
  return (
    <section
      className={cn("image-and-content-section lg:my-20 lg:px-6", {
        "prose-headings:text-white prose-p:text-white": blok?.background_color === "primary-1",
        "prose-headings:text-primary-1":
          blok?.background_color === "secondary-1" || blok?.background_color === "gray-light",
      })}
    >
      <div
        className={cn(
          blok?.background_color && `bg-${blok?.background_color}`,
          "image-and-content mx-auto max-w-screen-xl border-b-[140px] border-b-white px-6 py-12 lg:border-b-0 lg:px-24 lg:py-20",
          {
            "bg-opacity-20": blok?.background_color === "secondary-1",
            "lg:border-l-[80px] lg:border-l-white": blok?.orientation === "video_first",
            "lg:border-r-[80px] lg:border-r-white": blok?.orientation === "content_first",
          },
        )}
      >
        <div
          className={cn("mx-auto flex max-w-screen-xl flex-col items-center gap-8 lg:gap-0", {
            "justify-end lg:flex-row-reverse": blok?.orientation === "video_first",
            "lg:flex-row": blok?.orientation === "content_first",
          })}
        >
          <div className="lg:basis-5/12">
            <h2>
              {blok?.eyebrow ? <span className="eyebrow block pb-2.5">{blok?.eyebrow}</span> : null}
              <span className="block pb-5">{blok?.heading}</span>
            </h2>
            <div className="">{richText(blok?.content)}</div>
          </div>
          <div
            className={cn("relative h-full w-full pr-4 pt-4 lg:basis-7/12 lg:scale-110", {
              "lg:-left-32": blok?.orientation === "video_first",
              "lg:-right-32": blok?.orientation === "content_first",
            })}
          >
            <div className="image-and-content-image relative z-10 -mb-[120px] h-full w-full border-2 border-secondary-1 lg:-mb-0">
              <div className="relative -right-4 -top-4 w-full">
                <DynamicVideo {...blok?.video[0]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
