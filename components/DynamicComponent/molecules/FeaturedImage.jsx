import Image from "next/image"
import storyblokImageLoader from "utilities/storyblokImageLoader"

export default function FeaturedImage({ blok }) {
  return (
    <section className="w-full mb-8 h-60 lg:h-[545px] relative">
      <Image
        loader={storyblokImageLoader}
        src={blok?.image?.filename ?? "https://via.placeholder.com/3840x2160"}
        alt={blok?.image?.alt ?? null}
        priority
        fill
        className="object-cover"
      />
    </section>
  )
}
