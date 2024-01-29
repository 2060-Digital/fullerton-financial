import Breadcrumbs from "components/Breadcrumbs"
import Image from "components/Image"
import richText from "utilities/richText"

export default function PageHeader({ blok }) {
  return (
    <section className="bg-primary-1 mt-24 lg:mt-16 pl-6 lg:pl-0 pb-16 lg:pb-0">
      <div className="flex flex-col-reverse lg:grid grid-cols-5 lg:gap-7">
        <div className="col-span-2 lg:self-center justify-self-end max-w-96 pr-6 lg:pr-0 xl:mr-32 lg:pl-6">
          <Breadcrumbs breadcrumbs={blok?.breadcrumbs} />
          <h1 className="text-white">{blok?.heading}</h1>
          {blok?.content ? <div className="pt-4 prose-p:text-white">{richText(blok?.content)}</div> : null}
        </div>
        <div className="border-2 border-secondary-1 relative -top-20 lg:-top-14 right-0 col-span-3 w-full lg:w-auto 2xl:w-max justify-self-end self-end -mb-8 lg:-mb-0">
          <Image
            src={blok?.image?.filename}
            alt={blok?.image?.alt}
            width={896}
            height={585}
            className="relative -right-5 -top-5 w-full"
          />
        </div>
      </div>
    </section>
  )
}
