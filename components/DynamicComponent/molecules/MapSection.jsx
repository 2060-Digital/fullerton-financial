import Map from "components/Map"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import DateTime from "public/assets/date-time-icon.svg"
import Location from "public/assets/Location-icon.svg"
import richText from "utilities/richText"

export default function MapSection({ blok }) {
  return (
    <section className="lg:px-6 lg:my-20 ">
      <div className="px-6 py-12 lg:py-20 mx-auto max-w-screen-xl border-b-[140px] border-b-white lg:border-b-0 bg-primary-1 bg-harvest lg:px-24 lg:border-l-[80px] lg:border-l-white">
        <div className="flex flex-col-reverse gap-8 lg:gap-0 lg:items-center mx-auto max-w-screen-xl lg:flex-row">
          <div className="w-full h-full lg:basis-7/12 relative pr-4 pt-4 lg:scale-110 lg:-left-32">
            <div className="relative z-10 w-full border-2 border-secondary-1 -mb-[120px] lg:-mb-0 h-[200px] sm:h-[300px] lg:h-[381px]">
              <div className="w-full h-full relative -top-4 -right-4">
                <Map
                  lng={parseFloat(blok?.address?.lng)}
                  lat={parseFloat(blok?.address?.lat)}
                  locations={[
                    {
                      longitude: parseFloat(blok?.address?.lng),
                      latitude: parseFloat(blok?.address?.lat),
                      name: blok?.location_name,
                      directionsLink: getStoryblokLink(blok?.directions_link),
                      address: { localized_address_display: blok?.address?.formattedAddress },
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="lg:basis-5/12 text-white">
            <h2 className="text-white pb-8">{blok?.heading}</h2>
            <div className="flex gap-8 xl:gap-20">
              <div>
                <DateTime className="mb-2" />
                <h3 className="text-white mb-2">Date & Time</h3>
                <div className="prose-p:text-white prose-p:pb-1">{richText(blok?.formatted_date_time)}</div>
              </div>
              <div>
                <Location className="mb-2" />
                <h3 className="text-white mb-2">Location</h3>
                <div className="prose-p:text-white prose-p:pb-1">{richText(blok?.formatted_address)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
