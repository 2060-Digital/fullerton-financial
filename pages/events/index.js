import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getEventArchive } from "storyblok/events"
import EventSection from "components/Eventbrite/EventSection"
import DynamicComponent from "components/DynamicComponent"
import Meta from "components/Meta"
import { getEventsForArchive } from "eventbrite/events"

export default function EventsArchive({ events, story, meta }) {
  return (
    <>
      <Meta info={meta} />

      <main className="page-content" data-pagefind-body>
        {story?.content?.body?.map((blok) => (
          <DynamicComponent blok={blok} key={blok?._uid} />
        ))}
        <EventSection events={events} />
      </main>
      <Script src="https://www.eventbrite.com/static/widgets/eb_widgets.js" />
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()
  const events = await getEventsForArchive()

  const story = await getEventArchive("events", preview)

  return {
    props: {
      events,
      globals,
      story: story ?? null,
      meta: story?.content?.seo,
      preview,
    },
  }
}
