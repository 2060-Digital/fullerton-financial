import { getGlobals } from "storyblok/api"
import { getEventArchive } from "storyblok/events"
import { getAllPublicEvents } from "eventbrite/api"
import EventSection from "components/Eventbrite/EventSection"
import DynamicComponent from "components/DynamicComponent"
import Meta from "components/Meta"

export default function EventsArchive({ events, story, meta }) {
  return (
    <>
      <Meta info={meta} />

      <main>
        {story?.content?.body.map((blok) => (
          <DynamicComponent blok={blok} key={blok?._uid} />
        ))}
        <EventSection events={events} />
      </main>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()
  const events = await getAllPublicEvents()

  const story = await getEventArchive(preview)

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
