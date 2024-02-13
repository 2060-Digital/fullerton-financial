import { useEffect } from "react"

export default function LazyVideo({ sources, className, ...delegated }) {
  useEffect(() => {
    document.querySelectorAll("video.lazy").forEach((video) => {
      video.querySelectorAll("source").forEach((source) => {
        if (typeof source.tagName === "string" && source.tagName === "SOURCE") {
          if (window.innerWidth >= 768) {
            source.src = source.dataset.src
          }
        }
      })

      video.load()
      video.classList.remove("lazy")
    })
  }, [])

  return (
    <video className={className ? "lazy " + className : "lazy"} {...delegated} preload="auto">
      {sources ? sources.map(({ src, ...delegated }, idx) => <source key={idx} data-src={src} {...delegated} />) : null}
    </video>
  )
}
