export default function WufooEmbed({ formID, initialHeight = 640 }) {
  const height = parseInt(initialHeight) + 300

  return (
    <div>
      <iframe
        height={height}
        title="Embedded Wufoo Form"
        allowTransparency
        frameborder="0"
        style={{ width: "100%", border: "none" }}
        src={`https://fullertonfinancial.wufoo.com/embed/${formID}/`}
        sandbox="allow-popups-to-escape-sandbox allow-top-navigation allow-scripts allow-popups allow-forms allow-same-origin"
        allowFullScreen
        allow="geolocation; microphone; camera"
      >
        {/* <a href={`https://fullertonfinancial.wufoo.com/forms/${formID}/`}>Fill out my Wufoo form!</a> */}
      </iframe>
    </div>
  )
}
