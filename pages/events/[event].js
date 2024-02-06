import Link from "next/link"
import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getEventByID, getIndividualEventPaths } from "eventbrite/api"
import useEventbriteModal from "eventbrite/useEventbriteModal"
import EventbritePageHeader from "components/Eventbrite/EventbritePageHeader"
import Image from "components/Image"

export default function IndividualEventPage({ event, eventID }) {
  const { embedCreated, setEmbedCreated, modalProps, eventHash } = useEventbriteModal(event)

  return (
    <>
      <main>
        <EventbritePageHeader
          {...{
            event,
            modalProps,
            eventHash,
            embedCreated,
            setEmbedCreated,
          }}
        />
        <section>
          {event.content.modules.map(({ data }) => {
            if (data?.image) {
              return <Image src={data?.image?.url} alt="" width={585} height={350} key={data.id} />
            }
            return <div dangerouslySetInnerHTML={{ __html: data?.body?.text ?? null }} key={data.id}></div>
          })}
        </section>
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
