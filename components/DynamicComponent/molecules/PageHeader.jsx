import cn from "classnames"
import Breadcrumbs from "components/Breadcrumbs"
import DynamicVideo from "components/DynamicVideo"
import Image from "components/Image"
import isRichTextValid from "utilities/isRichTextValid"
import richText from "utilities/richText"

export default function PageHeader({ blok }) {
  const hasImage = Boolean(blok?.image?.filename?.length)
  const hasVideo = Boolean(blok?.video?.length)

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(blok));

  return (
    <section
      className={cn("bg-primary-1", {
        "mt-24 pb-12 pl-6 sm:pb-16 lg:mt-16 lg:pb-0 lg:pl-0": hasImage || hasVideo,
        "px-6 py-8 lg:py-12": !hasImage && !hasVideo,
      })}
    >
      <div
        className={cn({
          "mx-auto flex max-w-screen-2xl flex-col-reverse lg:flex-row lg:gap-12": hasImage || hasVideo,
          "mx-auto max-w-screen-xl": !hasImage && !hasVideo,
        })}
      >
        <div
          className={cn({
            "w-full max-w-[26rem] justify-self-end pr-6 lg:ml-6 lg:self-center lg:py-8 lg:pr-0 xl:ml-[72px] xl:mr-14 2xl:ml-[94px] 2xl:mr-12 2xl:pl-8":
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
          <div className="relative -top-16 right-0 -mb-8 mr-3 h-full w-full self-end justify-self-end border-2 border-secondary-1 lg:-top-10 lg:-mb-0">
            <Image
              src={blok?.image?.filename}
              alt={blok?.image?.alt}
              width={896}
              height={585}
              className="relative -right-3.5 -top-3.5 aspect-[896/505] w-full object-cover"
            />
          </div>
        ) : null}

        {hasVideo ? (
          <div className="relative -top-16 right-0 -mb-8 mr-3 h-full w-full self-end justify-self-end border-2 border-secondary-1 lg:-top-28 lg:-mb-0 2xl:-top-12">
            <div className="relative -right-3.5 -top-3.5 w-full">
              <DynamicVideo {...blok?.video[0]} />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
