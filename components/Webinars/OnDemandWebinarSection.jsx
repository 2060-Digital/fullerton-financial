import Link from "next/link"
import CallToAction from "components/CallToAction"

function Card({ webinar }) {
  return (
    <article className="bg-gray-light">
      <div className="h-full p-7">
        <Link href={webinar.slug}>
          <h3 className="text-primary-1 pb-4 hover:underline">{webinar.subject}</h3>
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
    <section className="py-12 lg:py-24 px-6">
      <div className="max-w-screen-lg mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {webinars.map((webinar) => (
          <Card webinar={webinar} key={webinar.webinarKey} />
        ))}
      </div>
    </section>
  )
}
