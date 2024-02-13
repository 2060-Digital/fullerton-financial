import generateSBPlaiceholders from "utilities/generateSBPlaiceholders"
import { getAllPublicEvents, getEventsForUpcomingEvents } from "eventbrite/api"

export default async function processPageData(data) {
  const processedData = data?.content?.body?.length
    ? await generateSBPlaiceholders({
        ...data,
        content: {
          ...data.content,
          body: await Promise.all(
            data.content.body.map(async (blok) => {
              if (blok.component === "upcoming_events_section") {
                const events = await getEventsForUpcomingEvents()
                return {
                  ...blok,
                  events: await getAllPublicEvents(),
                }
              }

              return blok
            }),
          ),
        },
      })
    : data

  return processedData
}
