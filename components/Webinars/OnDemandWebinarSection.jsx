import Link from "next/link"
import CallToAction from "components/CallToAction"
import Image from "components/Image"
import storyblokImageLoader from "utilities/storyblokImageLoader"
import richText from "utilities/richText"

function Card({ webinar: { content, full_slug } }) {
  return (
    <article>
      <div className="h-full bg-gray-light">
        <div className="relative w-full">
          <div className="absolute right-5 top-5 z-10 h-full w-full border-2 border-secondary-1"></div>
          <Image
            loader={content?.image?.filename && content?.image?.filename !== "" ? storyblokImageLoader : undefined}
            src={
              content?.image?.filename && content?.image?.filename !== ""
                ? content?.image?.filename
                : "/assets/placeholder.png"
            }
            alt={content?.image?.alt ?? ""}
            placeholder={content?.image?.blurDataURL ? "blur" : "empty"}
            blurDataURL={content?.image?.blurDataURL}
            width={299}
            height={178}
            className="relative z-20 aspect-[2/1] min-h-[170px] w-full object-cover"
            sizes="(max-width: 1024px) 45vw, (max-width: 640px) 95vw, 20vw"
          />
        </div>
        <div className="p-7">
          <Link href={full_slug}>
            <h3 className="pb-4 text-primary-1 hover:underline">{content.title}</h3>
          </Link>
          <div className="">{richText(content.content)}</div>
          <CallToAction href={full_slug} style="secondary" className="pt-4">
            Watch Now
          </CallToAction>
        </div>
      </div>
    </article>
  )
}

export default function OnDemandWebinarSection({ webinars }) {
  return (
    <section className="px-6 py-12 lg:py-24">
      <h2 className="pb-8 text-center text-primary-1 lg:pb-16">On-Demand Webinars</h2>

      <div className="mx-auto grid max-w-screen-lg gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {webinars.map((webinar) => (
          <Card webinar={webinar} key={webinar.id} />
        ))}
      </div>
    </section>
  )
}
