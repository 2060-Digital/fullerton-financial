import cn from "classnames"
import Breadcrumbs from "components/Breadcrumbs"
import DynamicVideo from "components/DynamicVideo"
import Image from "components/Image"
import isRichTextValid from "utilities/isRichTextValid"
import richText from "utilities/richText"

export default function PageHeader({ blok }) {
  const hasImage = Boolean(blok?.image?.filename?.length)
  const hasVideo = Boolean(blok?.video?.length)

  return (
    <section
      className={cn("bg-primary-1", {
        "mt-24 lg:mt-16 pl-6 lg:pl-0 pb-12 sm:pb-16 lg:pb-0": hasImage || hasVideo,
        "px-6 py-8 lg:py-12": !hasImage && !hasVideo,
      })}
    >
      <div
        className={cn({
          "flex flex-col-reverse lg:flex-row lg:gap-12 max-w-screen-2xl mx-auto": hasImage || hasVideo,
          "max-w-screen-xl mx-auto": !hasImage && !hasVideo,
        })}
      >
        <div
          className={cn({
            "lg:self-center justify-self-end max-w-96 pr-6 lg:pr-0 xl:mr-14 2xl:mr-12 lg:ml-6 xl:ml-[72px] 2xl:ml-[94px] 2xl:pl-8 lg:py-8 w-full":
              hasImage || hasVideo,
          })}
        >
          <Breadcrumbs breadcrumbs={blok?.breadcrumbs} />
          <h1 className="text-white">{blok?.heading}</h1>
          {isRichTextValid(blok?.content) ? (
            <div className="pt-4 prose-p:text-white">{richText(blok?.content)}</div>
          ) : null}
        </div>
        {hasImage && !hasVideo ? (
          <div className="border-2 border-secondary-1 relative -top-16 lg:-top-10 right-0 w-full justify-self-end self-end -mb-8 lg:-mb-0 h-full mr-3">
            <Image
              src={blok?.image?.filename}
              alt={blok?.image?.alt}
              width={896}
              height={585}
              className="relative -right-3.5 -top-3.5 w-full aspect-[896/505] object-cover"
            />
          </div>
        ) : null}

        {hasVideo ? (
          <div className="border-2 border-secondary-1 relative -top-16 lg:-top-28 2xl:-top-12 right-0 w-full justify-self-end self-end -mb-8 lg:-mb-0 h-full mr-3">
            <div className="relative -right-3.5 -top-3.5 w-full">
              <DynamicVideo {...blok?.video[0]} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
