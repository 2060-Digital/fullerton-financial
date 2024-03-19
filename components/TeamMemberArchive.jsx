import { useState } from "react"
import cn from "classnames"
import Image from "next/image"
import Link from "next/link"
import getSbImageDimensions from "utilities/getSbImageDimensions"
import storyblokImageLoader from "utilities/storyblokImageLoader"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import CallToAction from "components/CallToAction"
import Arrow from "public/assets/chevron-down.svg"

const Card = ({ image, first_name, last_name, job_title, team_category, email, vip, slug }) => {
  const isImage = image?.filename

  return (
    <div className={cn("group h-full lg:bg-gray-light", { "bg-secondary-2 lg:bg-secondary-2": vip })}>
      <div className="relative w-full">
        {vip || team_category.includes("advisors") ? (
          <div className="group-hover">
            <div className="absolute right-5 top-5 z-10 h-full w-full border-2 border-secondary-1 group-hover:border-tertiary-1"></div>
            <Link href={slug}>
              <Image
                loader={isImage ? storyblokImageLoader : undefined}
                src={isImage ? image.filename : "/assets/team-placeholder.png"}
                alt={image.alt ?? ""}
                placeholder={image.blurDataURL ? "blur" : "empty"}
                blurDataURL={image.blurDataURL}
                width={isImage ? getSbImageDimensions("width", image?.filename) : 300}
                height={isImage ? getSbImageDimensions("height", image?.filename) : 300}
                className="relative z-20 aspect-square min-h-[170px] w-full object-cover"
                sizes="(max-width: 1024px) 45vw, (max-width: 640px) 95vw, 20vw"
              />
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute right-5 top-5 z-10 h-full w-full border-2 border-secondary-1"></div>
            <Image
              loader={isImage ? storyblokImageLoader : undefined}
              src={isImage ? image.filename : "/assets/team-placeholder.png"}
              alt={image.alt ?? ""}
              placeholder={image.blurDataURL ? "blur" : "empty"}
              blurDataURL={image.blurDataURL}
              width={isImage ? getSbImageDimensions("width", image?.filename) : 300}
              height={isImage ? getSbImageDimensions("height", image?.filename) : 300}
              className="relative z-20 aspect-square min-h-[170px] w-full object-cover"
              sizes="(max-width: 1024px) 45vw, (max-width: 640px) 95vw, 20vw"
            />
          </div>
        )}
      </div>
      <div className={cn("py-10 lg:px-7", { "px-7": vip })}>
        {vip || team_category.includes("advisors") ? (
          <Link href={slug}>
            <h3 className="pb-2 text-primary-1 decoration-tertiary-1 hover:underline">
              {first_name} {last_name}
            </h3>
          </Link>
        ) : (
          <h3 className="pb-2 text-primary-1">
            {first_name} {last_name}
          </h3>
        )}
        <div className={cn("font-primary leading-7", { "text-primary-1": vip })}>{job_title}</div>
        <CallToAction href={getStoryblokLink(email)} style="email-blue" target="_blank" className="z-20 uppercase">
          email
        </CallToAction>
      </div>
    </div>
  )
}

export default function TeamMemberArchive({ items, vip, categories, currentTab, archiveLink, categoryLinkPrefix }) {
  const [open, setOpen] = useState(false)

  const Tab = ({ name, value, link }) => (
    <Link
      className={cn(
        "lg:decoration-tertiary mr-8 whitespace-nowrap py-2 text-left font-primary capitalize text-white transition-all duration-300 lg:mr-0 lg:py-4 lg:decoration-tertiary-1 lg:underline-offset-4 lg:hover:underline",
        {
          "h-0 opacity-0 lg:h-auto lg:py-4 lg:opacity-100": currentTab.value !== value && !open,
          "lg:underline lg:decoration-tertiary-1": currentTab.value === value,
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
      <nav className="sticky top-0 z-30 w-full bg-primary-2 lg:relative lg:px-6">
        <div className="mx-auto flex flex-col justify-between lg:max-w-2xl lg:flex-row">
          <button
            className={cn("w-full self-start px-5 py-2 text-left capitalize italic text-white lg:hidden", {
              "scale-y-0": open,
              "scale-y-100": !open,
            })}
            onClick={() => setOpen(!open)}
          >
            {currentTab.name}
          </button>
          <div
            className={cn(
              "archive-tab-bar z-100 absolute mx-auto flex w-full origin-top flex-col bg-primary-2 px-5 transition-all duration-300 lg:relative lg:w-max lg:flex-row lg:gap-8 lg:overflow-x-auto lg:px-0 xl:gap-12",
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
      <section className="px-6 py-10 lg:py-24">
        <div className="mx-auto max-w-screen-xl">
          {vip?.length ? (
            <div className={cn("grid gap-8 pb-10 pl-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-20 lg:pb-24")}>
              {vip.map((item) => (
                <Card {...item} key={item.name} />
              ))}
            </div>
          ) : null}

          <div className={cn("grid gap-8 pl-5 min-[350px]:grid-cols-2 lg:grid-cols-4 lg:gap-16")}>
            {items.map((item) => (
              <Card {...item} key={item.name} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
