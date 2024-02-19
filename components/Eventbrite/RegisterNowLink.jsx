import CallToAction from "components/CallToAction"

export default function RegisterNowLink({
  embedCreated,
  setEmbedCreated,
  eventHash,
  style = "primary",
  label = "Register Now",
}) {
  return (
    <CallToAction
      href={`#${eventHash}`}
      onClick={() => {
        if (!embedCreated) setEmbedCreated(true)
      }}
      style={style}
      className="whitespace-nowrap"
    >
      {label}
    </CallToAction>
  )
}
