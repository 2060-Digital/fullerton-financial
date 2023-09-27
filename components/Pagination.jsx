import { useEffect, useRef } from "react"
import cn from "classnames"
import Arrow from "public/assets/arrow.svg"

export default function Pagination({ pageCount, currentPage, setCurrentPage, scrollAnchor = "__next" }) {
  const isFirstMount = useRef(true)
  useEffect(() => {
    // prevent scrolling to scrollAnchor on page/component mount
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    document.getElementById(scrollAnchor).scrollIntoView({ behavior: "smooth" })
  }, [currentPage, scrollAnchor])

  // no need for pagination, might as well call it!
  if (pageCount <= 1) return null

  currentPage = parseInt(currentPage)
  const DOTS = "..."

  function pagination() {
    const range = (startAt, endAt) => Array.from({ length: endAt - startAt + 1 }, (_, i) => i + startAt)

    // If dots are not required
    if (pageCount <= 5) return range(1, pageCount)

    // If only right dots should appear
    if (currentPage <= 3) {
      return [...range(1, 4), DOTS, pageCount]
    }

    // If only left dots should appear
    if (currentPage >= pageCount - 2) {
      return [1, DOTS, ...range(pageCount - 3, pageCount)]
    }

    // If both left and right dots should appear
    return [1, DOTS, ...range(currentPage - 1, currentPage + 1), DOTS, pageCount]
  }

  const PageNumbers = () =>
    pagination()?.map((pageNumber, idx) => {
      if (pageNumber === DOTS)
        return (
          <span key={"dots-" + idx} className="mx-2 -mb-3 text-l2 cursor-default flex justify-center items-center">
            {DOTS}
          </span>
        )

      return (
        <button
          key={idx}
          disabled={pageNumber === +currentPage}
          onClick={() => setCurrentPage(pageNumber)}
          className={cn(
            `page-${pageNumber}`,
            "mx-2 flex justify-center disabled:cursor-not-allowed text-xl1 sm:text-xl2 after:box-content relative hover:after:h-1 after:absolute after:w-6 after:-bottom-1 after:bg-orange",
            {
              "after:box-content after:h-1 after:absolute after:w-6 after:-bottom-1 after:bg-orange underline":
                pageNumber === +currentPage,
            }
          )}
          aria-label={`Page ${pageNumber}${pageNumber === +currentPage ? ` (Current Page)` : ``}`}
        >
          {pageNumber}
        </button>
      )
    })

  return (
    <div className="mx-auto flex justify-center items-center mt-8 mb-12 px-10">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="prev-page flex mr-6 disabled:cursor-not-allowed"
        aria-label="Previous Page"
      >
        {/* adding custom class(es) overrides pagination-arrow class, so we have to add it back */}
        <Arrow className="rotate-180 pagination-arrow disabled:fill-gray-50" />
      </button>

      <PageNumbers />

      <button
        disabled={currentPage === pageCount}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="next-page flex hover:text-green ml-6 disabled:cursor-not-allowed "
        aria-label="Next Page"
      >
        <Arrow />
      </button>
    </div>
  )
}
