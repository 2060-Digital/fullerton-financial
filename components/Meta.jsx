import Head from "next/head"

export default function Meta({ info }) {
  return info ? (
    <Head>
      <title>{info?.title}</title>
      <meta name="description" content={info?.description} />
      <meta property="og:title" content={info?.og_title} />
      <meta property="og:image" content={info?.og_image} />
      <meta property="og:description" content={info?.og_description} />
      <meta property="twitter:title" content={info?.twitter_title} />
      <meta property="twitter:image" content={info?.twitter_image} />
      <meta property="twitter:description" content={info?.twitter_description} />
    </Head>
  ) : null
}
