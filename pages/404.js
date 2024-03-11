import { useEffect, useState } from "react"
import Fuse from "fuse.js"
import Link from "next/link"
import { useRouter } from "next/router"
import Meta from "components/Meta"
import { getGlobals } from "storyblok/api"
import CallToAction from "components/CallToAction"

export default function Page({ meta }) {
  const router = useRouter()
  const [results, setResults] = useState()

  useEffect(() => {
    const URL = /https?:\/\/.*(?=<\/loc>)/gim

    async function getSitemapURLs() {
      const origin = process.env.NEXT_PUBLIC_SITE_URL

      const index = await fetch("/sitemap.xml")
      const body = await index.text()
      const sitemapURLs = body.match(URL)

      const URLs = await Promise.all(
        sitemapURLs.map(async (sitemapURL) => {
          const sitemap = await fetch(sitemapURL.replace(origin, ""))
          const body = await sitemap.text()
          const URLs = body
            .match(URL)
            .map((URL) => URL.replace(origin, ""))
            .filter((URL) => URL !== "")

          return URLs
        }),
      )

      const fuse = new Fuse(URLs.flat(), {
        ignoreLocation: true,
        threshold: 0.4,
      })
      const results = fuse.search(router.asPath)
      setResults(results.slice(0, 5))
    }

    getSitemapURLs()
  }, [router.asPath])

  return (
    <>
      <Meta info={meta} />
      <main className="bg-secondary-2 px-6 py-12 lg:py-28">
        <h1 className="text-center text-primary-1">
          <span className="eyebrow block pb-2.5">404</span>
          <span className="block pb-5">Page Not Found</span>
        </h1>
        <p className="pb-6 text-center lg:pb-12">
          Sorry, the page you are trying to access could not be found. It may have been deleted or moved.
        </p>
        <div className="flex flex-col items-center justify-center">
          {results?.length ? (
            <div className="mx-auto pb-6 lg:pb-12">
              <>
                <h3 className="pb-4 text-center text-primary-1">Did You Mean...</h3>
                <ul>
                  {results.map((result) => (
                    <li className="pt-6 text-center first:pt-0" key={result.item}>
                      <Link
                        className="border-b-2 border-b-tertiary-1 text-center font-primary uppercase text-primary-1 transition-all duration-200 hover:border-b-secondary-1"
                        href={result.item}
                      >
                        {result.item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            </div>
          ) : null}
          <CallToAction href="/">Back To Home</CallToAction>
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals("exclude-global-sections")

  return {
    props: {
      preview,
      globals,
    },
  }
}
