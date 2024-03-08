import cn from "classnames"
import Image from "components/Image"
import richText from "utilities/richText"

function TimelineEntry({ image, heading, content }) {
  return (
    <div className="group odd:flex-row-reverse lg:flex">
      <div className="image-decor relative z-10 basis-1/2 lg:max-h-[500px] lg:min-h-[336px]">
        <Image
          src={image.filename}
          alt={image.alt}
          placeholder={image.blurDataURL ? "blur" : "empty"}
          blurDataURL={image.blurDataURL}
          width={610}
          height={300}
          className={cn(
            "relative inset-0 z-10 h-64 w-full object-center sm:h-96 lg:absolute lg:h-full lg:py-8  lg:group-even:pr-8  lg:group-odd:pl-8",
            {
              "object-cover": !image.filename.endsWith(".png"),
              "object-contain": image.filename.endsWith(".png"),
            },
          )}
        />
      </div>
      <div className="basis-1/2 pb-8 pt-4 lg:py-8">
        <div className=" border-white pb-4 pl-6 lg:group-even:pl-8 lg:group-odd:pl-0 lg:group-odd:pr-8">
          <h3 className="block text-teal-dark">{heading}</h3>
        </div>
        <div className="pl-6 pt-4 lg:group-even:pl-8 lg:group-odd:pl-0 lg:group-odd:pr-8">{richText(content)}</div>
      </div>
    </div>
  )
}

export default function TimelineSection({ blok }) {
  return (
    <section className="px-6 py-12 timeline">
      <div className="text-center py-8">
        <div className="text-primary-1 eyebrow">{blok.eyebrow}</div>
        <h2 className="text-primary-1">{blok.heading}</h2>
      </div>
      <div className="mx-auto max-w-[1070px] border-l-2 border-white lg:border-none">
        {blok.entries.map((entry) => (
          <TimelineEntry {...entry} key={entry.heading} />
        ))}
      </div>
    </section>
  )
}
