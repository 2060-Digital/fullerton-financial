import Script from "next/script"
import { useEffect, useState } from "react"

export default function WufooEmbed({ formID, initialHeight = 640 }) {
  const [mounted, setMounted] = useState()

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? (
    <>
      <div id={`wufoo-${formID}`}></div>
      <Script
        src="https://secure.wufoo.com/scripts/embed/form.js"
        strategy="afterInteractive"
        id="wufoo_form_embed"
        onReady={() => {
          try {
            const options = {
              userName: "fullertonfinancial",
              formHash: formID,
              autoResize: true,
              height: initialHeight,
              async: true,
              host: "wufoo.com",
              header: "show",
              ssl: true,
            }

            const form = new WufooForm()
            form.initialize(options)
            form.display()
          } catch (e) {
            if (e instanceof Error) {
              console.error(e.message)
            }
            console.error(e)
          }
        }}
      />
    </>
  ) : null
}
