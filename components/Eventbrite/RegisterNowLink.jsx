import CallToAction from "components/CallToAction"

export default function RegisterNowLink({ embedCreated, setEmbedCreated, eventHash }) {
  return (
    <CallToAction
      href={`#${eventHash}`}
      onClick={() => {
        if (!embedCreated) setEmbedCreated(true)
      }}
      className="whitespace-nowrap w-full sm:w-max"
    >
      Register Now
    </CallToAction>
  )
}
