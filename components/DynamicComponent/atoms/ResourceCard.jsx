import CallToAction from "components/CallToAction"
import Image from "components/Image"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import richText from "utilities/richText"

export default function ResourceCard({ blok }) {
  return (
    <div className="bg-secondary-2 px-7 py-10">
      <Image
        src={blok?.thumbnail?.filename}
        alt={blok?.thumbnail?.alt ?? ""}
        placeholder={blok?.thumbnail?.blurDataURL ? "blur" : "empty"}
        blurDataURL={blok?.thumbnail?.blurDataURL}
        width={311}
        height={405}
        className="w-full pb-4"
        sizes="(max-width: 1024px) 45vw, (max-width: 640px) 95vw, 20vw"
      />
      <div className="flex flex-col gap-4 items-center justify-between h-max">
        <div>
          <h3 className="text-center text-primary-1 pb-4">{blok?.heading}</h3>
          <div className="prose-p:text-primary-1 text-center">{richText(blok?.content)}</div>
        </div>
        <CallToAction href={getStoryblokLink(blok?.cta_link)} style="ghost" className="self-end">
          {blok?.cta_label}
        </CallToAction>
      </div>
    </div>
  )
}
