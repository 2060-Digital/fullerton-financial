import Map from "components/Map"
import CallToAction from "components/CallToAction"

export default function VenueMap({ venue }) {
  return (
    <section className="lg:px-6 lg:my-20">
      <div className="px-6 py-12 lg:py-20 mx-auto max-w-screen-xl border-b-[140px] border-b-white lg:border-b-0 bg-primary-1 lg:px-24 lg:border-l-[80px] lg:border-l-white">
        <div className="flex flex-col-reverse gap-8 lg:gap-0 lg:items-center mx-auto max-w-screen-xl lg:flex-row">
          <div className="w-full h-full lg:basis-7/12 relative pr-4 pt-4 lg:scale-110 lg:-left-32">
            <div className="relative z-10 w-full border-2 border-secondary-1 -mb-[120px] lg:-mb-0 h-[200px] sm:h-[300px] lg:h-[381px]">
              <div className="w-full h-full relative -top-4 -right-4">
                <Map lng={venue?.longitude} lat={venue?.latitude} locations={[venue]} />
              </div>
            </div>
          </div>
          <div className="lg:basis-5/12 text-white">
            <h2 className="text-white pb-4">{venue?.name}</h2>
            <address className="pb-4">
              {venue?.address?.localized_multi_line_address_display?.map((segment, idx) => (
                <span className="text-white block not-italic font-primary" key={`venue-map-address-segment-${idx}`}>
                  {segment}
                </span>
              ))}
            </address>
            <CallToAction href={venue?.directionsLink} target="_blank" style="secondary-white">
              Get Directions
            </CallToAction>
          </div>
        </div>
      </div>
    </section>
  )
}
