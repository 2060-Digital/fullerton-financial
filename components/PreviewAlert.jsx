import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import CallToAction from "./CallToAction"

export default function PreviewAlert() {
  const [visible, setVisible] = useState(false)
  const { query } = useRouter()

  useEffect(() => {
    const separatePreviewWindow = window.location === window.parent.location

    // display the exit preview banner for preview content show in a separate tab
    if (separatePreviewWindow) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [])

  return visible ? (
    <div className="text-xs bg-blue-light py-2 text-center font-primary">
      <span className="mr-2">This page is a preview. Remember to save & publish your changes.</span>

      <CallToAction
        title="Click here to see how this page currently looks in production."
        href={`/api/exit-preview?slug=${query.slug}&secret=${query.secret}`}
      >
        Exit Preview
      </CallToAction>
    </div>
  ) : null
}
