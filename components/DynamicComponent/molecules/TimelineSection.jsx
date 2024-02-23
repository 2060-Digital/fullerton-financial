import cn from "classnames"
import Image from "components/Image"
import richText from "utilities/richText"

function TimelineEntry({ image, dates, title, content }) {
  return (
    <div className="group even:flex-row-reverse lg:flex">
      <div className="image-decor relative z-10 basis-1/2 lg:max-h-[500px] lg:min-h-[336px] lg:group-odd:border-r lg:group-odd:border-white lg:group-even:border-l lg:group-even:border-white">
        <Image
          src={image.filename}
          alt={image.alt}
          placeholder={image.blurDataURL ? "blur" : "empty"}
          blurDataURL={image.blurDataURL}
          width={610}
          height={300}
          className={cn(
            "relative inset-0 z-10 h-64 w-full rounded-br-4xl object-center sm:h-96 lg:absolute lg:h-full lg:py-8 lg:group-odd:rounded-bl-4xl lg:group-odd:rounded-br-none lg:group-odd:pr-8 lg:group-even:rounded-br-4xl lg:group-even:pl-8",
            {
              "object-cover": !image.filename.endsWith(".png"),
              "object-contain": image.filename.endsWith(".png"),
            },
          )}
        />
      </div>
      <div className="basis-1/2 pb-8 pt-4 lg:py-8 lg:group-odd:border-l lg:group-odd:border-white lg:group-even:border-r lg:group-even:border-white">
        <div className="border-b-2 border-white pb-4 pl-6 lg:group-odd:pl-8 lg:group-even:pl-0 lg:group-even:pr-8">
          <h2 className="block text-teal-dark">{dates}</h2>
          <h3 className="block text-teal-dark">{title}</h3>
        </div>
        <div className="pl-6 pt-4 lg:group-odd:pl-8 lg:group-even:pl-0 lg:group-even:pr-8">{richText(content)}</div>
      </div>
    </div>
  )
}

export default function TimelineSection({ blok }) {
  return (
    <section className="px-6 py-12 timeline">
      <div className="mx-auto max-w-[1070px] border-l-2 border-white lg:border-none">
        {blok.entries.map((entry) => (
          <TimelineEntry {...entry} key={entry.title} />
        ))}
      </div>
    </section>
  )
}
