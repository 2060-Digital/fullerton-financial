import CallToAction from "components/CallToAction"
import { getStoryblokLink } from "utilities/getStoryblokLink"

export default function NewsletterSidebar({ blok }) {
  return (
    <section className="px-6 py-8 lg:py-16">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
        <iframe
          src={getStoryblokLink(blok?.current_newsletter_iframe_embed)}
          height="600px"
          width="100%"
          className="lg:basis-2/3"
        ></iframe>
        <aside className="bg-secondary-2 p-7 lg:basis-1/3">
          <h2 className="pb-5 text-primary-1">Previous Issues</h2>
          {blok?.newsletter_archive?.map(({ year, newsletters, _uid }) => (
            <ul key={_uid} className="flex flex-col items-start gap-5 pb-5 last:pb-0">
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
