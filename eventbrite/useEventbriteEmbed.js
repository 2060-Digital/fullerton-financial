import { useEffect, useState } from "react"
import slugify from "utilities/slugify"

export default function useEventbriteEmbed(event) {
  const [modalOpened, setModalOpened] = useState(false)

  useEffect(() => {
    if (window && modalOpened) {
      window.EBWidgets?.createWidget({
        widgetType: "checkout",
        eventId: event.id,
        iframeContainerId: `event-${slugify(event.name.text)}-${event.id}`,
        iframeContainerHeight: 425,
        onOrderComplete: () => {},
      })
    }
  }, [event, modalOpened])

  return { modalOpened, setModalOpened }
}
