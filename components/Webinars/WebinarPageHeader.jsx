import CallToAction from "components/CallToAction"

export default function WebinarPageHeader({ webinar }) {
  return (
    <section className="bg-primary-1 px-6 py-8 lg:py-12">
      <div className="max-w-screen-xl mx-auto">
        <div>
          <h1 className="text-white pb-4">{webinar?.subject}</h1>
          {webinar?.times?.map((time) => (
            <time
              className="text-white block font-primary font-bold text-m1 lg:text-m2 pb-4"
              key={`${time?.formatted}-webinar-${webinar?.webinarKey}`}
            >
              {time?.formatted}
            </time>
          ))}
          <CallToAction href={webinar?.registrationUrl}>Register Now</CallToAction>
        </div>
      </div>
    </section>
  )
}
