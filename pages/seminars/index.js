import Script from "next/script"
import { getGlobals } from "storyblok/api"
import { getEventArchive } from "storyblok/events"
import { getSeminarsForArchive } from "eventbrite/seminars"
import DynamicComponent from "components/DynamicComponent"
import Meta from "components/Meta"

export default function EventsArchive({ events, story, meta }) {
  return (
    <>
      <Meta info={meta} />

      <main className="page-content event-archive" data-pagefind-body>
        {story?.content?.body?.map((blok) => (
          <DynamicComponent blok={blok} key={blok?._uid} />
        ))}
      </main>
      <Script src="https://www.eventbrite.com/static/widgets/eb_widgets.js" />
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()
  const events = await getSeminarsForArchive()

  const story = await getEventArchive("seminars", preview)

  return {
    props: {
      events,
      globals,
      story: story ?? null,
      meta: story?.content?.twentysixty_seo,
      preview,
    },
  }
}
