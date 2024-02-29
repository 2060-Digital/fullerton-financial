import cn from "classnames"
import Image from "next/image"
import Link from "next/link"
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

const Tab = () => {
  return <div className=""></div>
}

export default function CategoryArchiveSection({
  items,
  vip,
  categories,
  currentTab,
  archiveLink,
  categoryLinkPrefix,
}) {
  return (
    <div>
      <nav>
        <Tab name="All" value="all" link={archiveLink} />
        {categories?.map((category) => (
          <Tab {...category} key={category.value} link={`${categoryLinkPrefix}${category.value}`} />
        ))}
      </nav>
      <section className={`px-6`}>
        <div className="max-w-screen-xl mx-auto pb-8 ">
          <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-20 py-8")}>
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
