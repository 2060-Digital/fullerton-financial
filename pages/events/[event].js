import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getEventByID, getIndividualEventPaths } from "eventbrite/api"
import Image from "components/Image"
import EventbritePageHeader from "components/Eventbrite/EventbritePageHeader"
import VenueMap from "components/Eventbrite/VenueMap"
import Meta from "components/Meta"

export default function IndividualEventPage({ event }) {
  return (
    <>
      <Meta
        info={{
          title: event?.name?.html,
          description: event?.description?.html,
          og_title: event?.name?.html,
          og_image: event?.logo?.original?.url,
          og_description: event?.description?.html,
          twitter_title: event?.name?.html,
          twitter_image: event?.logo?.original?.url,
          twitter_description: event?.description?.html,
        }}
      />
      <main>
        <EventbritePageHeader event={event} />
        <section className="px-6 my-12">
          <div className="grid lg:grid-cols-2 max-w-screen-xl mx-auto gap-12">
            {event.content.modules.map(({ data }) => {
              if (data?.image) {
                return (
                  <div
                    className="relative z-10 w-full h-full border-2 border-secondary-1 mt-4 mr-4"
                    key={data?.image?.id}
                  >
                    <Image
                      src={data?.image?.url}
                      alt=""
                      width={585}
                      height={350}
                      sizes="95vw, (min-width: 1024px) 35vw"
                      className="w-full h-full object-cover relative -top-4 -right-4"
                    />
                  </div>
                )
              }
              return (
                <div
                  dangerouslySetInnerHTML={{ __html: data?.body?.text ?? null }}
                  key={data?.body?.id}
                  className="event-page-content prose-headings:text-primary-1 prose-headings:pb-4"
                ></div>
              )
            })}
          </div>
        </section>
        <VenueMap venue={event?.venue} />
      </main>
      <Script src="https://www.eventbrite.com/static/widgets/eb_widgets.js" />
    </>
  )
}

export async function getStaticProps({ params: { event } }) {
  const globals = await getGlobals()

  const id = event.split("-")[event.split("-").length - 1]
  const individualEvent = await getEventByID(id)

  return {
    props: {
      globals,
      eventID: id,
      event: individualEvent ?? null,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getIndividualEventPaths(),
    fallback: false,
  }
}
