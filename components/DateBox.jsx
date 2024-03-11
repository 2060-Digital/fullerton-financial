export default function DateBox({ month, day }) {
  return month && day ? (
    <div className="mb-4 aspect-square bg-secondary-1 px-6 py-4 text-center lg:mb-0 lg:px-10 lg:py-8">
      <div className="eyebrow text-white">{month}</div>
      <h3 className="text-white">{day}</h3>
    </div>
  ) : null
}
