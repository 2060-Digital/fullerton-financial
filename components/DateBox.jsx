export default function DateBox({ date }) {
  return (
    <div className="bg-secondary-1 mb-4 lg:mb-0 py-4 px-6 lg:py-8 lg:px-10 text-center aspect-square">
      <div className="eyebrow text-white">
        {new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(date))}
      </div>
      <h3 className="text-white">{new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(new Date(date))}</h3>
    </div>
  )
}
