import { useEffect, useState } from "react"
import slugify from "slugify"
import useModal from "utilities/useModal"

export default function useEventbriteModal(event) {
  const eventHash = `event-${slugify(event.name.html, {
    lower: true,
  })}-${event.id}`

  const modalProps = useModal(eventHash)

  const [embedCreated, setEmbedCreated] = useState(false)

  useEffect(() => {
    if (window && embedCreated) {
      window.EBWidgets?.createWidget({
        widgetType: "checkout",
        eventId: event.id,
        iframeContainerId: eventHash,
        iframeContainerHeight: 720,
        onOrderComplete: () => {},
      })
    }
  }, [event, eventHash, embedCreated])

  return { modalProps, embedCreated, setEmbedCreated, eventHash }
}
