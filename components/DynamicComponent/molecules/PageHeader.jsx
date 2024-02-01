import cn from "classnames"
import Breadcrumbs from "components/Breadcrumbs"
import Image from "components/Image"
import richText from "utilities/richText"

export default function PageHeader({ blok }) {
  const hasImage = Boolean(blok?.image?.filename?.length)

  return (
    <section
      className={cn("bg-primary-1", {
        "mt-24 lg:mt-16 pl-6 lg:pl-0 pb-16 lg:pb-0": hasImage,
        "px-6 py-8 lg:py-12": !hasImage,
      })}
    >
      <div
        className={cn({
          "flex flex-col-reverse lg:grid grid-cols-5 lg:gap-7": hasImage,
          "max-w-screen-xl mx-auto": !hasImage,
        })}
      >
        <div
          className={cn({
            "col-span-2 lg:self-center justify-self-end max-w-96 pr-6 lg:pr-0 xl:mr-32 lg:pl-6": hasImage,
          })}
        >
          <Breadcrumbs breadcrumbs={blok?.breadcrumbs} />
          <h1 className="text-white">{blok?.heading}</h1>
          {blok?.content?.length ? <div className="pt-4 prose-p:text-white">{richText(blok?.content)}</div> : null}
        </div>
        {hasImage ? (
          <div className="border-2 border-secondary-1 relative -top-16 lg:-top-10 right-0 col-span-3 w-full lg:w-auto 2xl:w-max justify-self-end self-end -mb-8 lg:-mb-0 h-full mr-[12px]">
            <Image
              src={blok?.image?.filename}
              alt={blok?.image?.alt}
              width={896}
              height={585}
              className="relative -right-3.5 -top-3.5 w-full"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
