import Image from "components/Image"

export default function StructuredContentSection({ modules }) {
  return (
    <section className="px-6">
      <div className="py-12 lg:py-24 grid lg:grid-cols-2 max-w-screen-xl mx-auto gap-12 border-b-2 border-b-secondary-1">
        {modules.map(({ data }) => {
          if (data?.image) {
            return (
              <div className="relative z-10 w-full h-full border-2 border-secondary-1 mt-4 mr-4" key={data?.image?.id}>
                <Image
                  src={data?.image?.url}
                  alt=""
                  width={585}
                  height={350}
                  sizes="95vw, (min-width: 1024px) 35vw"
                  className="w-full h-full object-cover relative -top-4 -right-4"
                />
              </div>
            )
          }
          return (
            <div
              dangerouslySetInnerHTML={{ __html: data?.body?.text ?? null }}
              key={data?.body?.id}
              className="event-page-content prose-headings:text-primary-1 prose-headings:pb-4 prose-h3:text-l2 prose-h3:lg:text-xl1 prose-h3:pt-2 first:prose-h3:pt-0 prose-h4:text-m2 prose-h4:lg:text-l1 prose-h4:font-secondary"
            ></div>
          )
        })}
      </div>
    </section>
  )
}
