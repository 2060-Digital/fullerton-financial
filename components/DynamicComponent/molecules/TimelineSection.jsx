import cn from "classnames"
import Image from "components/Image"
import richText from "utilities/richText"

function TimelineEntry({ image, heading, content }) {
  return (
    <li className="group odd:flex-row-reverse lg:flex border-l-2 border-white last:border-none lg:border-none">
      <div className="image-decor relative z-10 basis-1/2 lg:max-h-[500px] lg:min-h-[336px] lg:pb-24">
        <div className="relative z-10 border-2 border-l-0 lg:border-l-2 border-white lg:group-even:border-r-0 lg:group-odd:border-l-0 lg:group-last-of-type:border-r-2 group-last:border-l-2 lg:group-last:left-[2px]">
          <Image
            src={image.filename}
            alt={image.alt}
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            width={610}
            height={300}
            className={cn("relative z-10  w-full -top-4 -right-4 lg:group-even:-left-4")}
          />
        </div>
      </div>
      <div className="basis-1/2 pb-16 pt-4 lg:py-8 border-white lg:group-odd:border-r-2 lg:group-even:border-l-2 lg:border-t-2 lg:-mr-[2px] lg:group-last-of-type:border-l-0">
        <div className=" border-white pb-4 pl-4 lg:group-even:pl-8 lg:group-odd:pl-0 lg:group-odd:pr-8">
          <h3 className="block text-primary-1">{heading}</h3>
        </div>
        <div className="pt-4 pl-4 lg:group-even:pl-8 lg:group-odd:pl-0 lg:group-odd:pr-8">{richText(content)}</div>
      </div>
    </li>
  )
}

export default function TimelineSection({ blok }) {
  return (
    <section className="px-6 py-12 timeline">
      <div className="text-center py-16">
        <div className="text-primary-1 eyebrow">{blok.eyebrow}</div>
        <h2 className="text-primary-1">{blok.heading}</h2>
      </div>
      <ol className="mx-auto max-w-[1070px]">
        {blok.entries.map((entry) => (
          <TimelineEntry {...entry} key={entry.heading} />
        ))}
      </ol>
    </section>
  )
}
