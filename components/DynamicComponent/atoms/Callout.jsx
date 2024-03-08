export default function Callout({ blok }) {
  return (
    <section className="my-12 lg:my-24 px-6">
      <div className="p-7 bg-secondary-2 max-w-screen-xl mx-auto">
        <blockquote className="font-secondary text-primary-1 font-medium leading-7 lg:text-center text-m2 max-w-3xl mx-auto">
          {blok?.quote}
        </blockquote>
        {blok?.citation?.length ? (
          <cite className="not-italic block pt-4 font-primary text-primary-1 lg:text-center max-w-3xl mx-auto">
            {blok.citation}
          </cite>
        ) : null}
      </div>
    </section>
  )
}
