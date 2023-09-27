import Image from "components/Image"
import richText from "utilities/richText"
import cn from "classnames"

export default function ImageAndContent({ blok }) {
  const section = cn(blok.background_color && `bg-${blok.background_color}`)

  const container = cn(
    "image-content-container flex flex-col gap-4 md:gap-12 items-center md:items-start px-10 xl:px-8 mx-auto max-w-screen-xl",
    {
      "md:flex-row-reverse justify-end": blok.orientation === "content_first",
      "md:flex-row": blok.orientation === "image_first",
    }
  )

  const imgDecorContainer = cn("image-decor max-w-lg md:max-w-none md:w-full basis-1/2 relative pb-20 md:pb-12")

  const image = cn("relative z-10", {
    "pl-12 xl:pl-40": blok.orientation === "content_first",
    "pr-12": blok.orientation === "image_first",
  })

  return (
    <section className={section}>
      <div className={container}>
        <div className={imgDecorContainer}>
          <div className={image}>
            <Image
              src={blok.image.filename}
              alt={blok.image.alt}
              placeholder={blok.image?.blurDataURL ? "blur" : "empty"}
              blurDataURL={blok.image?.blurDataURL}
              width={435}
              height={511}
            />
          </div>
        </div>
        <div className="basis-1/2 image-content">
          <h2>{blok.heading}</h2>
          <div className="leading-8 prose-p:py-2">{richText(blok.content)}</div>
        </div>
      </div>
    </section>
  )
}
