import VenueLink from "components/Eventbrite/VenueLink"

function Event({ event, venue }) {
  return (
    <div className="px-5 border-2 border-secondary-1">
      <h4 className="text-primary-1 text-center">{event?.name?.html}</h4>
      <p className="text-primary-1">
        <VenueLink event={event} venue={venue} />
      </p>
    </div>
  )
}

export default function EventsCarouselSection({ blok }) {
  return (
    <section className="px-6 my-12">
      <h2 className="text-center text-primary-1 pb-8 lg:pb-12">{blok?.heading}</h2>
      <div>
        {blok?.events?.map((event) => (
          <Event event={event} venue={event?.venue} key={event?.id} />
        ))}
      </div>
    </section>
  )
}
