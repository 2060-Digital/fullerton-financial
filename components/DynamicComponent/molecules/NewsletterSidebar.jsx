import CallToAction from "components/CallToAction"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function NewsletterSidebar({ blok }) {
  return (
    <section className="px-6 py-8 lg:py-16">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
        <iframe
          src={getStoryblokLink(blok?.current_newsletter_iframe_embed)}
          height="600px"
          width="100%"
          className="lg:basis-2/3"
        ></iframe>
        <aside className="lg:basis-1/3 bg-secondary-2 p-7">
          <h2 className="text-primary-1 pb-5">Previous Issues</h2>
          {blok?.newsletter_archive?.map(({ year, newsletters, _uid }) => (
            <ul key={_uid} className="pb-5 last:pb-0 flex flex-col gap-5 items-start">
              <h3 className="text-primary-1">{year}</h3>
              {newsletters?.map(({ newsletter, label, _uid }) => (
                <li className="block" key={_uid}>
                  <CallToAction href={newsletter?.filename} style="secondary">
                    {label}
                  </CallToAction>
                </li>
              ))}
            </ul>
          ))}
        </aside>
      </div>
    </section>
  )
}
