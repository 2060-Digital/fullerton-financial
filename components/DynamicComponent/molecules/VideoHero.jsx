import Image from "components/Image"
import richText from "utilities/richText"
import LazyVideo from "components/LazyVideo"

export default function VideoHero({ blok }) {
  return (
    <section className="video-hero relative">
      <div className="hidden max-h-[580px] before:absolute before:inset-0 before:z-10 before:h-full before:w-full before:bg-primary-1 before:bg-opacity-70 before:mix-blend-multiply lg:block lg:h-full">
        {blok.video.filename ? (
          <LazyVideo
            className="pointer-events-none relative z-0 h-[580px] w-full object-cover"
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
        ) : (
          <div className="inset-0 w-full">
            <Image
              src={blok.video_poster.filename}
              alt={blok.video_poster.alt}
              width={1440}
              height={696}
              className="relative h-[250px] w-full object-cover object-[62%_50%] md:h-[530px]"
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
      <div className="relative z-20 w-full gap-8 bg-secondary-2 px-6 py-8 text-center prose-headings:pb-8 prose-headings:text-primary-1 prose-p:text-primary-1 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:bg-[transparent] lg:py-12 lg:prose-headings:text-white lg:prose-p:text-white">
        {richText(blok?.content)}
      </div>
    </section>
  )
}
