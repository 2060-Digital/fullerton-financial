import Meta from "components/Meta"
import { useEffect, useRef, useState } from "react"
import { getGlobals } from "storyblok/api"
import { useQueryState } from "next-usequerystate"
import Script from "next/script"
import PageHeader from "components/DynamicComponent/molecules/PageHeader"

export default function Search({ meta }) {
  const [query, setQuery] = useQueryState("q", { shallow: true })
  const [searchLoaded, setSearchLoaded] = useState(false)

  const pagefindUIRef = useRef(null)
  const pagefindInstance = useRef(null)

  // Avoid text content mismatch in header
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!searchLoaded) return

    const updateQuery = (e) => setQuery(e.target.value)

    pagefindInstance.current.triggerSearch(query)
    const searchInput = pagefindUIRef.current.querySelector(".pagefind-ui__search-input")
    searchInput.addEventListener("input", updateQuery)
  }, [searchLoaded, query, setQuery])

  return isClient ? (
    <>
      <Meta info={meta} />
      <main>
        <PageHeader blok={{ heading: query ? `Search Results for ‘${query}’` : `Search Our Site` }} />
        <section className="px-6 py-12 lg:py-24">
          <div ref={pagefindUIRef} id="search-page" className="max-w-screen-lg mx-auto"></div>
        </section>

        <Script
          src="pagefind/pagefind-ui.js"
          onReady={() => {
            pagefindInstance.current = new window.PagefindUI({
              element: "#search-page",
              autofocus: true,
              highlightParam: "highlight",
              showImages: false,
              resetStyles: true,
              sort: {
                "weight[data-weight]": "desc",
              },
              translations: {
                placeholder: "Search our site",
                clear_search: "Clear",
                load_more: "Load more results",
                search_label: "Search our site",
                filters_label: "Filters",
                zero_results: "No results for “[SEARCH_TERM]”",
                many_results: "[COUNT] results for “[SEARCH_TERM]”",
                one_result: "[COUNT] result for “[SEARCH_TERM]”",
                alt_search: "No results for “[SEARCH_TERM]”. Showing results for [DIFFERENT_TERM]” instead",
                search_suggestion: "No results for “[SEARCH_TERM]”. Try one of the following searches:",
                searching: "Searching for “[SEARCH_TERM]”...",
              },
              processResult: function (result) {
                return {
                  ...result,
                  // TODO: figure out why some results are included with the wrong URL i.e. /server/pages/
                  url: result.url.replaceAll(/\/server\/pages|.html/gi, ""),
                }
              },
            })

            pagefindInstance.current.triggerSearch(query)
            setSearchLoaded(true)
          }}
        />
      </main>
    </>
  ) : null
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
