import cn from "classnames"
import Image from "next/image"
import Link from "next/link"
import Arrow from "public/assets/chevron-down.svg"
import { useState } from "react"
import getSbImageDimensions from "utilities/getSbImageDimensions"
import storyblokImageLoader from "utilities/storyblokImageLoader"

const Card = ({ image, first_name, last_name, job_title, vip, slug }) => {
  return (
    <Link href={slug}>
      <div className={cn("bg-gray-light h-full", { "bg-secondary-2": vip })}>
        <div className="w-full relative">
          <div className="w-full h-full absolute border-2 border-secondary-1 top-5 right-5 z-10"></div>
          <Image
            loader={image.filename && image.filename !== "" ? storyblokImageLoader : undefined}
            src={image.filename && image.filename !== "" ? image.filename : "/assets/placeholder.png"}
            alt={image.alt ?? ""}
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            width={getSbImageDimensions("width", image.filename)}
            height={getSbImageDimensions("height", image.filename)}
            className="w-full aspect-square object-cover min-h-[170px] relative z-20"
            sizes="(max-width: 1024px) 45vw, (max-width: 640px) 95vw, 20vw"
          />
        </div>
        <div className="px-7 py-10">
          <h3 className="text-primary-1 pb-2">
            {first_name} {last_name}
          </h3>
          <div className={cn(" leading-7", { "text-primary-1": vip })}>{job_title}</div>
        </div>
      </div>
    </Link>
  )
}

export default function CategoryArchiveSection({
  items,
  vip,
  categories,
  currentTab,
  archiveLink,
  categoryLinkPrefix,
}) {
  const [open, setOpen] = useState(false)

  const Tab = ({ name, value, link }) => (
    <Link
      className={cn(
        "font-primary text-white transition-all duration-300 text-left mr-8 lg:mr-0 whitespace-nowrap py-2 lg:py-4 lg:decoration-tertiary lg:underline-offset-4 lg:hover:underline lg:decoration-tertiary-1 capitalize",
        {
          "h-0 opacity-0 lg:py-4 lg:h-auto lg:opacity-100": currentTab.value !== value && !open,
          "lg:decoration-tertiary-1 lg:underline": currentTab.value === value,
          "h-auto opacity-100": open,
        },
      )}
      href={link}
      onClick={() => setOpen(false)}
    >
      {name}
    </Link>
  )

  return (
    <div>
      <nav className="bg-primary-2 w-full lg:px-6 sticky lg:relative top-0 z-30">
        <div className="lg:max-w-2xl mx-auto flex flex-col lg:flex-row justify-between">
          <button
            className={cn("self-start py-2 px-5 lg:hidden w-full text-left capitalize italic text-white", {
              "scale-y-0": open,
              "scale-y-100": !open,
            })}
            onClick={() => setOpen(!open)}
          >
            {currentTab.name}
          </button>
          <div
            className={cn(
              "archive-tab-bar flex flex-col lg:flex-row lg:gap-8 xl:gap-12 mx-auto bg-primary-2 absolute lg:relative w-full transition-all duration-300 origin-top px-5 lg:px-0 z-100 lg:w-max lg:overflow-x-auto",
              {
                "scale-y-0 lg:scale-y-100": !open,
                "scale-y-100": open,
              },
            )}
          >
            <Tab name="All" value="all" link={archiveLink} />
            {categories?.map((category) => (
              <Tab {...category} key={category.value} link={`${categoryLinkPrefix}${category.value}`} />
            ))}
          </div>
          <button
            className="absolute right-4 top-0 z-20 lg:hidden"
            onClick={() => setOpen(!open)}
            title="Filter Archive items by Title"
          >
            <Arrow
              className={cn("h-10", {
                "rotate-180 lg:-rotate-90": open,
                "lg:-rotate-90": !open,
              })}
            />
          </button>
        </div>
      </nav>
      <section className="px-6 relative">
        <div className="max-w-screen-xl mx-auto pb-8 ">
          <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-20 py-8 lg:py-16")}>
            {vip.map((item) => (
              <Card {...item} key={item.name} />
            ))}
          </div>
          <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-8 py-8")}>
            {items.map((item) => (
              <Card {...item} key={item.name} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
