import DynamicComponent from ".."

export default function ThreeColumnSection({ blok }) {
  return (
    <section className="px-5 py-12 lg:py-20">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-center mb-12 text-primary-1">{blok.heading}</h2>
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16">
          {blok.cards.map((card) => (
            <DynamicComponent key={blok._uid} blok={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
