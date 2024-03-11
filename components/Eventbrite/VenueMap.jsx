import Map from "components/Map"
import CallToAction from "components/CallToAction"

export default function VenueMap({ venue }) {
  return (
    <section className="lg:my-20 lg:px-6">
      <div className="mx-auto max-w-screen-xl border-b-[140px] border-b-white bg-primary-1 px-6 py-12 lg:border-b-0 lg:border-l-[80px] lg:border-l-white lg:px-24 lg:py-20">
        <div className="mx-auto flex max-w-screen-xl flex-col-reverse gap-8 lg:flex-row lg:items-center lg:gap-0">
          <div className="relative h-full w-full pr-4 pt-4 lg:-left-32 lg:basis-7/12 lg:scale-110">
            <div className="relative z-10 -mb-[120px] h-[200px] w-full border-2 border-secondary-1 sm:h-[300px] lg:-mb-0 lg:h-[381px]">
              <div className="relative -right-4 -top-4 h-full w-full">
                <Map lng={venue?.longitude} lat={venue?.latitude} locations={[venue]} />
              </div>
            </div>
          </div>
          <div className="text-white lg:basis-5/12">
            <h2 className="pb-4 text-white">{venue?.name}</h2>
            <address className="pb-4">
              {venue?.address?.localized_multi_line_address_display?.map((segment, idx) => (
                <span className="block font-primary not-italic text-white" key={`venue-map-address-segment-${idx}`}>
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
