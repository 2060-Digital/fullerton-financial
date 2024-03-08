import Head from "next/head"

import "styles.css"
import "@fontsource/lato/latin-400.css"
import "@fontsource/lato/latin-700.css"
import "@fontsource/playfair-display/latin-700.css"

import PreviewAlert from "components/PreviewAlert"
import Header from "components/Header"
import Footer from "components/Footer"

import useStoryblok from "storyblok/useStoryblok"
import { resolve_relations } from "storyblok/resolveRelations"
import CTABanner from "components/DynamicComponent/atoms/CTABanner"

function MyApp({ Component, pageProps: { preview, story, globals, ...remainingProps } }) {
  story = useStoryblok({ story, resolve_relations })

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {preview && <PreviewAlert />}
      <Header header={globals?.header} utilityBar={globals?.utilitybar} phoneNumbers={globals?.phoneNumbers} />
      <Component story={story} {...remainingProps} />
      {globals?.ctaBanner ? <CTABanner blok={globals?.ctaBanner} /> : null}
      <Footer
        footerMenu={globals?.footer}
        colophon={globals?.colophon}
        locations={globals?.locations}
        socialMedia={globals?.socialMedia}
        phoneNumbers={globals?.phoneNumbers}
      />
    </>
  )
}

export default MyApp
