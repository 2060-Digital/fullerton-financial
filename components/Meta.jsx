import Head from "next/head"
import { useRouter } from "next/router"

export default function Meta({ info }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const router = useRouter()
  const cleanPath = router.asPath.split("#")[0].split("?")[0].slice(1).replace(".html", "")
  const canonicalUrl = `${siteUrl}` + (router.asPath === "/" ? "" : cleanPath)

  return info ? (
    <Head>
      {info?.title ? <title>{info?.title} | Fullerton Financial Services</title> : null}
      {info?.description ? <meta name="description" content={info?.description} /> : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {info?.og_title ? <meta property="og:title" content={info?.og_title} /> : null}
      {info?.og_image ? <meta property="og:image" content={info?.og_image} /> : null}
      {info?.og_description ? <meta property="og:description" content={info?.og_description} /> : null}
      {info?.twitter_title ? <meta property="twitter:title" content={info?.twitter_title} /> : null}
      {info?.twitter_image ? <meta property="twitter:image" content={info?.twitter_image} /> : null}
      {info?.twitter_description ? <meta property="twitter:description" content={info?.twitter_description} /> : null}
    </Head>
  ) : null
}
