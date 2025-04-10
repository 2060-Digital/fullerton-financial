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
          <span key={"dots-" + idx} className="cursor-default font-primary text-primary-1">
            {DOTS}
          </span>
        )

      return (
        <button
          key={idx}
          disabled={pageNumber === +currentPage}
          onClick={() => setCurrentPage(pageNumber)}
          className={cn(
            "flex justify-center px-2 font-primary text-primary-1 decoration-tertiary-1 decoration-2 underline-offset-4 hover:underline disabled:cursor-not-allowed",
            {
              underline: pageNumber === +currentPage,
            },
          )}
          aria-label={`Page ${pageNumber}${pageNumber === +currentPage ? ` (Current Page)` : ``}`}
        >
          {pageNumber}
        </button>
      )
    })

  return (
    <div className="mx-auto my-8 flex items-center justify-center px-10">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="prev-page mr-6 flex disabled:cursor-not-allowed"
        aria-label="Previous Page"
      >
        <Arrow
          className={cn("rotate-180", {
            "text-tertiary-1": currentPage !== 1,
            "text-gray": currentPage === 1,
          })}
        />
      </button>

      <PageNumbers />

      <button
        disabled={currentPage === pageCount}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="next-page hover:text-green ml-6 flex disabled:cursor-not-allowed "
        aria-label="Next Page"
      >
        <Arrow
          className={cn({
            "text-tertiary-1": currentPage !== pageCount,
            "text-gray": currentPage === pageCount,
          })}
        />
      </button>
    </div>
  )
}
