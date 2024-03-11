import Link from "next/link"
import CallToAction from "components/CallToAction"

function Card({ webinar }) {
  return (
    <article className="bg-gray-light">
      <div className="h-full p-7">
        <Link href={webinar.slug}>
          <h3 className="pb-4 text-primary-1 hover:underline">{webinar.subject}</h3>
        </Link>
        <p className="">{webinar.description}</p>
        <CallToAction href={webinar.asset.registrationUrl} style="secondary">
          Watch Now
        </CallToAction>
      </div>
    </article>
  )
}

export default function OnDemandWebinarSection({ webinars }) {
  return (
    <section className="px-6 py-12 lg:py-24">
      <h2 className="pb-8 text-center text-primary-1 lg:pb-16">On-Demand Webinars</h2>

      <div className="mx-auto grid max-w-screen-lg gap-16 sm:grid-cols-2 lg:grid-cols-3">
        {webinars.map((webinar) => (
          <Card webinar={webinar} key={webinar.webinarKey} />
        ))}
      </div>
    </section>
  )
}
