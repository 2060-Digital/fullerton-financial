import Image from "components/Image"
import { getExcerpt } from "utilities/getExcerpt"
import richText from "utilities/richText"
import storyblokImageLoader from "utilities/storyblokImageLoader"

export default function PhotoCard({ blok }) {
  return (
    <div className="border-0.5 border-grey-cool bg-white">
      <Image
        loader={blok.image.filename && blok.image.filename !== "" ? storyblokImageLoader : undefined}
        src={blok.image.filename && blok.image.filename !== "" ? blok.image.filename : "/assets/placeholder.png"}
        alt={blok.image.alt ?? ""}
        placeholder={blok.image.blurDataURL ? "blur" : "empty"}
        blurDataURL={blok.image.blurDataURL}
        width={299}
        height={178}
        className="w-full aspect-[2/1] object-cover"
        sizes="(max-width: 1024px) 45vw, (max-width: 640px) 95vw, 20vw"
      />

      <div className="py-7 px-4 xl:px-7">
        <div className="pt-4">{richText(blok.content)}</div>
      </div>
    </div>
  )
}
