export default function PullQuote({ blok }) {
  return (
    <div className="p-7 my-6 bg-secondary-2">
      <blockquote className="font-secondary text-primary-1 font-medium leading-7 lg:text-center text-m2">
        {blok.quote}
      </blockquote>
      {blok?.citation?.length ? (
        <cite className="not-italic block pt-4 font-primary text-primary-1 lg:text-center">{blok.citation}</cite>
      ) : null}
    </div>
  )
}
