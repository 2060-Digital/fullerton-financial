import Image from "components/Image"
import richText from "utilities/richText"
import LazyVideo from "components/LazyVideo"

export default function VideoHero({ blok }) {
  return (
    <section className="relative">
      <div className="lg:h-full hidden lg:block">
        {blok.video.filename ? (
          <>
            <div className="bg-primary-1 mix-blend-multiply z-10 bg-opacity-70 absolute inset-0 h-full w-full" />
            <LazyVideo
              className="w-full object-cover relative pointer-events-none z-0"
              poster={blok.video_poster.filename}
              sources={[
                { src: blok.video.filename, type: "video/webm; codecs=av01.0.05M.08" },
                { src: blok.video_fallback.filename, type: "video/mp4" },
              ]}
              autoPlay
              playsInline
              muted
              loop
            />
          </>
        ) : (
          <div className="inset-0 w-full">
            <Image
              src={blok.video_poster.filename}
              alt={blok.video_poster.alt}
              width={1440}
              height={696}
              className="relative w-full h-[250px] md:h-[530px] object-cover object-[62%_50%]"
            />
          </div>
        )}
      </div>
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
      <div className="px-6 text-center gap-8 py-8 lg:py-12 bg-primary-1 lg:bg-[transparent] prose-headings:text-white prose-headings:pb-8 prose-p:text-white lg:absolute lg:top-1/2 lg:-translate-y-1/2 w-full relative z-20">
        {richText(blok?.content)}
      </div>
    </section>
  )
}
