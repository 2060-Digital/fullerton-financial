export default function DateBox({ month, day }) {
  return month && day ? (
    <div className="bg-secondary-1 mb-4 lg:mb-0 py-4 px-6 lg:py-8 lg:px-10 text-center aspect-square">
      <div className="eyebrow text-white">{month}</div>
      <h3 className="text-white">{day}</h3>
    </div>
  ) : null
}
