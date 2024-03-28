import Image from "next/image"

export default function StructuredContentSection({ modules, faqs }) {
  return modules?.length > 0 ? (
    <section className="px-6">
      <div className="mx-auto max-w-screen-xl py-12 lg:border-b-2 lg:border-b-secondary-1 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          {modules.map(({ data, id }) => {
            if (data?.image) {
              return (
                <div className="relative z-10 order-first mr-4 mt-4 h-full w-full border-2 border-secondary-1" key={id}>
                  <Image
                    src={data?.image?.url}
                    alt=""
                    width={585}
                    height={350}
                    sizes="95vw, (min-width: 1024px) 35vw"
                    className="relative -right-4 -top-4 h-full w-full object-cover"
                  />
                </div>
              )
            }
            return (
              <div
                dangerouslySetInnerHTML={{ __html: data?.body?.text ?? null }}
                key={id}
                className="event-page-content prose-headings:pb-4 prose-headings:text-primary-1 prose-h3:pt-2 prose-h3:text-l2 first:prose-h3:pt-0 prose-h4:font-secondary prose-h4:text-m2 prose-h3:lg:text-xl1 prose-h4:lg:text-l1"
              ></div>
            )
          })}
        </div>
        {faqs?.data?.faqs?.length > 0 ? <div className="py-12 lg:py-24"> FAQs</div> : null}
      </div>
    </section>
  ) : null
}
