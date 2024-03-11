import Image from "components/Image"
import richText from "utilities/richText"
import storyblokImageLoader from "utilities/storyblokImageLoader"

export default function PhotoCard({ blok }) {
  return (
    <div className="pl-5 lg:pl-0">
      <div className={`bg-${blok.background_color} h-full`}>
        <div className="relative w-full">
          <div className="absolute right-5 top-5 z-10 h-full w-full border-2 border-secondary-1"></div>
          <Image
            loader={blok.image.filename && blok.image.filename !== "" ? storyblokImageLoader : undefined}
            src={blok.image.filename && blok.image.filename !== "" ? blok.image.filename : "/assets/placeholder.png"}
            alt={blok.image.alt ?? ""}
            placeholder={blok.image.blurDataURL ? "blur" : "empty"}
            blurDataURL={blok.image.blurDataURL}
            width={299}
            height={178}
            className="relative z-20 aspect-[2/1] min-h-[170px] w-full object-cover"
            sizes="(max-width: 1024px) 45vw, (max-width: 640px) 95vw, 20vw"
          />
        </div>
        <div className="p-7 xl:px-7">
          <div className="prose-headings:pb-4 prose-headings:text-primary-1">{richText(blok.content)}</div>
        </div>
      </div>
    </div>
  )
}
