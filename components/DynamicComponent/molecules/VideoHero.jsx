import Image from "components/Image"
import richText from "utilities/richText"

export default function VideoHero({ blok }) {
  return (
    <section>
      {blok?.mobile_image?.filename?.length ? (
        <Image
          src={blok?.mobile_image?.filename}
          alt={blok?.mobile_image?.alt}
          placeholder={blok?.mobile_image?.blurDataURL ? "blur" : "empty"}
          blurDataURL={blok?.mobile_image?.blurDataURL}
          width={1023}
          height={577}
          className="w-full lg:hidden"
          sizes="(max-width: 1024px) 100vw, 0vw"
        />
      ) : null}
      <div className="px-6 text-center gap-8 py-8 lg:py-12 bg-primary-1 lg:bg-[transparent] prose-headings:text-white prose-headings:pb-8 prose-p:text-white">
        {richText(blok?.content)}
      </div>
    </section>
  )
}
