import DynamicComponent from ".."

export default function ThreeColumnSection({ blok }) {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto">
        <h2>{blok.heading}</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {blok.cards.map((card) => (
            <DynamicComponent key={blok._uid} blok={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
