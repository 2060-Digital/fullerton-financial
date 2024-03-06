import generateSBPlaiceholders from "utilities/generateSBPlaiceholders"
import { getEventsForUpcomingEvents } from "eventbrite/api"
import { getBreadcrumbs } from "storyblok/api"

export default async function processPageData(data, slug) {
  const processedData = data?.content?.body?.length
    ? await generateSBPlaiceholders({
        ...data,
        content: {
          ...data.content,
          body: await Promise.all(
            data.content.body.map(async (blok) => {
              if (blok.component === "upcoming_events_section") {
                return {
                  ...blok,
                  events: await getEventsForUpcomingEvents(),
                }
              }

              if (blok.component === "page_header_section" && slug) {
                return {
                  ...blok,
                  breadcrumbs: getBreadcrumbs(
                    slug
                      .split("/")
                      .filter((segment) => segment !== "")
                      .join("/"),
                  ),
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
