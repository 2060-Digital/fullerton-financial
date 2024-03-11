import cn from "classnames"
import Image from "components/Image"
import richText from "utilities/richText"

function TimelineEntry({ image, heading, content }) {
  return (
    <li className="group border-l-2 border-white last:border-none odd:flex-row-reverse lg:relative lg:flex lg:border-none">
      <div className="image-decor relative z-10 basis-1/2 lg:max-h-[500px] lg:min-h-[336px] lg:pb-24">
        <div className="relative z-10 border-2 border-l-0 border-white group-last:border-l-2 lg:border-l-2 lg:group-last:left-[2px] lg:group-odd:border-l-0 lg:group-even:border-r-0 lg:group-last-of-type:border-r-2">
          <Image
            src={image.filename}
            alt={image.alt}
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            width={610}
            height={300}
            className={cn("relative -right-4  -top-4 z-10 w-full lg:group-even:-left-4")}
          />
        </div>
      </div>
      <div className="basis-1/2 border-white pb-16 pt-4 lg:-mr-[2px] lg:border-t-2 lg:py-8 lg:group-odd:border-r-2 lg:group-even:border-l-2 lg:group-even:text-right lg:group-last-of-type:border-l-0">
        <div className="timeline-content relative border-white pl-4 lg:static lg:group-odd:pl-0 lg:group-odd:pr-8 lg:group-even:pl-8">
          <h3 className="block text-primary-1">{heading}</h3>
        </div>
        <div className="pl-4 pt-4 lg:group-odd:pl-0 lg:group-odd:pr-8 lg:group-even:pl-8">{richText(content)}</div>
      </div>
    </li>
  )
}

export default function TimelineSection({ blok }) {
  return (
    <section className="timeline px-6 py-12 lg:py-24">
      <div className="relative pb-16 text-center">
        <div className="eyebrow text-primary-1">{blok.eyebrow}</div>
        <h2 className="text-primary-1">{blok.heading}</h2>
      </div>
      <ol className="timeline-list mx-auto max-w-[1070px]">
        {blok.entries.map((entry) => (
          <TimelineEntry {...entry} key={entry.heading} />
        ))}
      </ol>
    </section>
  )
}
