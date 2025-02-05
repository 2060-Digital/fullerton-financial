import Script from "next/script"
import DynamicComponent from "components/DynamicComponent"
import Meta from "components/Meta"
import { getPage } from "storyblok/api"

export default function Home({ story, meta }) {
  return (
    <>
      <Meta info={meta} />
      <DynamicComponent blok={story?.content} />
      <Script type="application/ld+json" id="home-page-schema">
        {`{
           "@context": "https://schema.org",
           "@type": "WebSite",
           "url": "${process.env.NEXT_PUBLIC_SITE_URL}",
           "potentialAction": {
             "@type": "SearchAction",
             "target": {
               "@type": "EntryPoint",
               "urlTemplate": "${`${process.env.NEXT_PUBLIC_SITE_URL}/search/?q={search_term_string}`}"
              },
              "query-input": "required name=search_term_string"
            }
          }`}
      </Script>
      <Script type="application/ld+json" id="location-schema">
        {{
          "@context": "https://schema.org",
          "@type": "AccountingService",
          name: "Fullerton Financial Planning",
          image: "https://lirp.cdn-website.com/23a2e86a/dms3rep/multi/opt/logo-header-1920w.png",
          "@id": "",
          url: "https://www.fullertonfp.com/",
          telephone: "(623) 974-0300",
          address: {
            "@type": "PostalAddress",
            streetAddress: "14155 N. 83rd Ave., Suite 144",
            addressLocality: "Peoria",
            addressRegion: "AZ",
            postalCode: "85381",
            addressCountry: "US",
          },
        }}
      </Script>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  // home is the default slug for the homepage in Storyblok, but we've aliased it to '/' here and in the visual editor.
  // This template would otherwise be identical to pages/[...slug.js] and therefore unnecessary
  const { page, globals } = await getPage("home", preview)

  return {
    props: {
      globals,
      story: page ?? null,
      meta: page?.content?.twentysixty_seo ?? null,
      preview,
    },
  }
}
