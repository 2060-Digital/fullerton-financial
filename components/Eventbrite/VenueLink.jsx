import Link from "next/link"

export default function VenueLink({ event, venue }) {
  const addressStyles = "not-italic"

  if (event?.series_id) {
    return (
      <Link href={venue?.slug}>
        <address className={`${addressStyles} hover:underline`}>{venue?.name}</address>
      </Link>
    )
  }

  return <address className={addressStyles}>{venue?.name}</address>
}
