export default function PullQuote({ blok }) {
  return (
    <div className="my-6 bg-secondary-2 p-7">
      <blockquote className="font-secondary text-m2 font-medium leading-7 text-primary-1 lg:text-center">
        {blok.quote}
      </blockquote>
      {blok?.citation?.length ? (
        <cite className="block pt-4 font-primary not-italic text-primary-1 lg:text-center">{blok.citation}</cite>
      ) : null}
    </div>
  )
}
