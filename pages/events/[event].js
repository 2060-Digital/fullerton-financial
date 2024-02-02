import Link from "next/link"
import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getEventByID, getIndividualEventPaths } from "eventbrite/api"
import useEventbriteModal from "eventbrite/useEventbriteModal"
import RegisterNowLink from "components/Eventbrite/RegisterNowLink"
import EventbriteModal from "components/Eventbrite/EventbriteModal"

export default function IndividualEventPage({ event, eventID }) {
  const { embedCreated, setEmbedCreated, modalProps, eventHash } = useEventbriteModal(event)

  return (
    <>
      <main>
        <section>
          <h1>{event.name.text}</h1>
          <time>{event.start.utc}</time>
          {event.content.modules.map(({ data }) => (
            <div dangerouslySetInnerHTML={{ __html: data?.body?.text ?? null }} key={data.id}></div>
          ))}
          {event.series_id ? (
            <Link href={event.venue.slug} className="underline hover:no-underline">
              <address>{event.venue.name}</address>
            </Link>
          ) : (
            <address>{event.venue.name}</address>
          )}
          <RegisterNowLink {...{ embedCreated, setEmbedCreated, eventHash }} />
        </section>
        <EventbriteModal {...modalProps} eventHash={eventHash} />
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
