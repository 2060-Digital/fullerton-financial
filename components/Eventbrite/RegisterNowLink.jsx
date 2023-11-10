import Link from "next/link"

export default function RegisterNowLink({ embedCreated, setEmbedCreated, eventHash }) {
  return (
    <Link
      href={`#${eventHash}`}
      onClick={() => {
        if (!embedCreated) setEmbedCreated(true)
      }}
      className="underline hover:no-underline"
    >
      Register Now
    </Link>
  )
}
