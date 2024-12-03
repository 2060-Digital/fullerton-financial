import Image from "components/Image"
import Link from "next/link"
import { getStoryblokLink } from "utilities/getStoryblokLink"

function Badge({ image, link }) {
  const href = getStoryblokLink(link)
  if (!href) return null
  return (
    <Link href={href} target="_blank">
      <Image
        src={image?.filename}
        alt={image?.alt ?? ""}
        placeholder={image?.blurDataURL ? "blur" : "empty"}
        blurDataURL={image?.blurDataURL}
        width={164}
        height={40}
      />
    </Link>
  )
}

export default function DualBadge({ blok }) {
  return (
    <div className="flex gap-4 flex-col sm:flex-row items-center sm:items-start pb-4 last:pb-0">
      <Badge image={blok?.badge_1} link={blok?.badge_link_1} />
      <Badge image={blok?.badge_2} link={blok?.badge_link_2} />
    </div>
  )
}
