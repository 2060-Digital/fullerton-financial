import { useEffect, useState } from "react"

export default function useStoryblok({ story: originalStory, resolve_relations = false }) {
  const [story, setStory] = useState(originalStory)

  useEffect(() => {
    setStory(originalStory)
  }, [originalStory])

  useEffect(() => {
    //  bail if we're not in a Storyblok preview iframe
    if (typeof window !== "undefined" && !window.location.search.includes("_storyblok")) {
      return
    }

    // check for existing script
    if (!document.querySelector("#storyblokBridge")) {
      const script = document.createElement("script")
      script.src = "//app.storyblok.com/f/storyblok-v2-latest.js"
      script.id = "storyblokBridge"
      document.body.appendChild(script)
      script.onload = () => initEventListeners(resolve_relations, originalStory, setStory)
    }
  }, [originalStory, resolve_relations])

  return story
}

/**
 *
 * Set up the Storyblok Bridge interactive editor
 *
 * @returns undefined
 */
function initEventListeners(resolveRelations, story, setStory) {
  const { StoryblokBridge } = window

  resolveRelations = resolveRelations.split(",")

  const bridge = new StoryblokBridge({
    resolveRelations,
  })

  // loading the draft version on initial enter of editor
  bridge.on("enterEditmode", async (event) => {
    console.info(event)
    try {
      const StoryblokClient = (await import("storyblok-js-client")).default

      const Storyblok = new StoryblokClient({
        region: "US",
        accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
      })

      const draftResponse = await Storyblok.get(`cdn/stories/${event.storyId}`, {
        version: "draft",
        resolve_relations: resolveRelations,
      })

      const story = draftResponse?.data?.story

      if (story) setStory(story)
    } catch (error) {
      console.error(
        `Encountered an error attempting to fetch draft data on editor initialization: ${JSON.stringify(error)}`,
      )
    }
  })

  /**
   * live update the story on input events
   *
   * - check if the ids of the event and the passed story match
   * - change the story content through the setStory function
   **/
  bridge.on("input", (event) => {
    event.story.content._uid === story?.content?._uid && setStory(event.story)
  })

  // reload Next.js page on save or publish event in the Visual Editor
  bridge.on(["published", "change"], () => location.reload(true))
}
