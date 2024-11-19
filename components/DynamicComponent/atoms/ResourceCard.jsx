import CallToAction from "components/CallToAction"
import Image from "components/Image"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import richText from "utilities/richText"

export default function ResourceCard({ blok }) {
  return (
    <div className="resource-card flex flex-col bg-secondary-2 px-7 py-10">
      <div className="mx-auto lg:max-h-96 lg:max-w-96">
        <Image
          src={blok?.thumbnail?.filename}
          alt={blok?.thumbnail?.alt ?? ""}
          placeholder={blok?.thumbnail?.blurDataURL ? "blur" : "empty"}
          blurDataURL={blok?.thumbnail?.blurDataURL}
          width={311}
          height={405}
          style={{ width: "100%", height: "auto" }}
          className="pb-4"
          sizes="(max-width: 1024px) 45vw, (max-width: 640px) 95vw, 20vw"
        />
      </div>
      <div className="flex h-full flex-col justify-between gap-4 sm:items-center">
        <h3 className="text-center text-primary-1">{blok?.heading}</h3>
        <div className="text-center prose-p:text-primary-1">{richText(blok?.content)}</div>
        <div className="flex grow items-end">
          <CallToAction href={getStoryblokLink(blok?.cta_link)} style="ghost">
            {blok?.cta_label}
          </CallToAction>
        </div>
      </div>
    </div>
  )
}
