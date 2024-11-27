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

      </div>
    </section>
  )
}
