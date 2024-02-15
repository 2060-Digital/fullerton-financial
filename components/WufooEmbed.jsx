import { useEffect, useState, useRef } from "react"
import track from "utilities/track"

export default function WufooEmbed({ formURL, autoFocus, heightOffset = 30, initialHeight = 640, formID, ...rest }) {
  formID = formURL?.split("/")[formURL?.split("/").length - 1]
  const iframeRef = useRef(null)
  const [componentStyles, setComponentStyles] = useState({
    height: initialHeight,
    overflow: "hidden",
    border: 0,
    width: "100%",
  })

  const [hasMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMessages = (content) => {
      if (!content) {
        return
      }
      // Check if submission is completed.
      if (typeof content.data === "object" && content.data.action === "submission-completed") {
        track({ event: "form_submit", options: { formURL } })
        return
      }

      // From now on we only handle style related messages
      if (typeof content.data !== "string") {
        return
      }
      const [method, value, targetForm] = content.data.split(":")
      // eslint-disable-next-line
      if (formID && targetForm && targetForm !== formID) {
        // If you want to use multiple form via embed you need to use formID
        return
      }

      switch (method) {
        case "scrollIntoView" && autoFocus:
          if (typeof iframeRef.current.scrollIntoView === "function") {
            iframeRef.current.scrollIntoView()
          }
          break
        case "setHeight":
          setComponentStyles({ ...componentStyles, height: parseInt(value, 10) + heightOffset })
          break
        case "setMinHeight":
          setComponentStyles({ ...componentStyles, minHeight: parseInt(value, 10) + heightOffset })
          break
        case "reloadPage":
          try {
            iframeRef.current.contentWindow.location.reload()
          } catch (e) {
            console.info("failed to reload", e)
          }
          break
        default:
          break
      }
    }

    window.addEventListener("message", handleMessages, true) // Capture

    return () => {
      window.removeEventListener("message", handleMessages, true)
    }
  }, [autoFocus, componentStyles, formID, heightOffset, formURL, initialHeight])

  return hasMounted ? (
    <iframe
      ref={iframeRef}
      src={formURL}
      title="JotForm Form"
      style={componentStyles}
      allowFullScreen
      allow="geolocation; microphone; camera"
      {...rest}
    />
  ) : null
}
