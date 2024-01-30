import QuestionMark from "public/assets/question-icon.svg"

export default function QuestionList({ blok }) {
  return (
    <section className="mt-20">
      <h2 className="eyebrow pb-7">{blok?.heading}</h2>
      <div className="grid lg:grid-cols-3 gap-8">
        {blok?.cards?.map((card) => (
          <div className="flex flex-col gap-2.5" key={card?._uid}>
            <QuestionMark />
            <h3>{card?.question}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
