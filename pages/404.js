import { useEffect, useState } from "react"
import Fuse from "fuse.js"
import Link from "next/link"
import { useRouter } from "next/router"
import Meta from "components/Meta"
import { getGlobals } from "storyblok/api"

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
        })
      )

      const fuse = new Fuse(URLs.flat(), {
        ignoreLocation: true,
        threshold: 0.4,
      })
      const results = fuse.search(router.asPath)
      setResults(results.slice(0, 10))
    }

    getSitemapURLs()
  }, [router.asPath])

  return (
    <>
      <Meta info={meta} />
      <h1>Page Not Found</h1>
      <h2>Sorry, the page you{"'"}re trying to access could not be found. It may have been deleted or moved.</h2>
      <div className="px-10 lg:px-0  py-10 max-w-4xl mx-auto ">
        {results?.length ? (
          <>
            <h2 className="text-xl2 font-secondary font-medium pb-4">Did You Mean:</h2>
            <ul className="pb-12">
              {results.map((result) => (
                <li className="pt-6 first:pt-0" key={result.item}>
                  <Link className="underline font-secondary visited:text-blue hover:text-orange" href={result.item}>
                    {result.item}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const globals = await getGlobals()

  return {
    props: {
      preview,
      globals,
    },
  }
}
