import { useEffect, useRef, useState } from "react"

export default function useCarousel(numItems, slideWidth, slideGap, maxVisibleSlides) {
  const ref = useRef(null)
  const [visibleSlides, setVisibleSlides] = useState(maxVisibleSlides ?? numItems)
  const [offset, setOffset] = useState(0)

  const maxSliderWidth = slideWidth * numItems - slideGap

  useEffect(() => {
    function handleResize() {
      const parentElement = ref.current.parentElement
      if (parentElement) {
        setVisibleSlides(
          Math.min(Math.floor((parentElement.offsetWidth + slideGap) / slideWidth), maxVisibleSlides, numItems),
        )
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [numItems, maxVisibleSlides, slideGap, slideWidth])

  const moveLeft = () => {
    if (offset === 0) {
      setOffset(maxSliderWidth - ref.current.offsetWidth)
    } else {
      setOffset(offset - slideWidth)
    }
  }

  const moveRight = () => {
    if (offset === maxSliderWidth - ref.current.offsetWidth) {
      setOffset(0)
    } else {
      setOffset(offset + slideWidth)
    }
  }

  return { ref, visibleSlides, slideWidth, slideGap, offset, moveLeft, moveRight }
}
