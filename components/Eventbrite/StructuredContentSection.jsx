import FAQSection from "components/DynamicComponent/molecules/FAQSection"
import Image from "next/image"
import cn from "classnames"

export default function StructuredContentSection({ images, textBlocks, faqs }) {
  return images || textBlocks ? (
    <section className="px-6">
      <div className="mx-auto max-w-screen-xl py-12 lg:border-b-2 lg:border-b-secondary-1 lg:py-20 lg:pb-12">
        <div className={cn("grid gap-12", { "lg:grid-cols-2": images.length > 0 })}>
          {images.length > 0 ? (
            <div className="relative z-10 order-first mr-4 mt-4 h-full w-full border-2 border-secondary-1">
              {images?.map(({ data, id }) => (
                <Image
                  key={id}
                  src={data?.image?.url}
                  alt=""
                  width={585}
                  height={350}
                  sizes="95vw, (min-width: 1024px) 35vw"
                  className="relative -right-4 -top-4 h-full w-full object-cover"
                />
              ))}
            </div>
          ) : null}
          <div className={cn({ "grid lg:grid-cols-2": images && textBlocks.length > 1 })}>
            {textBlocks?.map(({ data, id }) => (
              <div
                dangerouslySetInnerHTML={{ __html: data?.body?.text ?? null }}
                key={id}
                className="event-page-content py-4 prose-headings:pb-4 prose-headings:text-primary-1 prose-h3:pt-2 prose-h3:text-l2 first:prose-h3:pt-0 prose-h4:font-secondary prose-h4:text-m2 prose-h3:lg:text-xl1 prose-h4:lg:text-l1"
              ></div>
            ))}
          </div>
        </div>
        {faqs?.length > 0 ? <FAQSection blok={{ heading: "Frequently Asked Questions", items: faqs }} /> : null}
      </div>
    </section>
  ) : null
}
