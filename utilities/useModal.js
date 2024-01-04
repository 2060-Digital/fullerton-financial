import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/router"

/**
 * useModal
 *
 * @description For rendering a hash/fragment based modal in a view
 * @param String hash The hash/fragment, including the '#', that will render the modal when present in the address bar
 * @returns [isOpen, closeModal, focusRef]
 * isOpen - Boolean value useful for determining whether or not to render a modal,
 * closeModal - a function that removes the provided hash from the current route and sets isOpen to false,
 * focusRef - a ref to attach to the element that should be focused when the modal is opened for usability/accessibility purposes
 *  */
function useModal(hash) {
  const router = useRouter()
  const [isOpen, setModal] = useState(false)

  // remove the hash/fragment from the url e.g. /blog#free-assessment -> /blog
  const closeModal = useCallback(() => {
    if (router.asPath.toLowerCase().endsWith(hash.toLowerCase())) {
      router.push(router.asPath.split("#")[0], undefined, { shallow: true, scroll: false })
      setModal(false)
      document.body.classList.remove("overflow-hidden")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const openModal = useCallback(() => {
    setModal(true)
    document.body.classList.add("overflow-hidden")
  }, [])

  // for accessibility
  const focusRef = useCallback((modal) => {
    if (modal !== null) {
      modal.focus()
      modal.addEventListener("focusout", (e) => {
        if (!modal.contains(e.relatedTarget)) modal.focus()
      })
    }
  }, [])

  useEffect(() => {
    // open the modal regardless of whether user directly navigates to hash via address bar or viewport interaction e.g. button click
    if (router.asPath.toLowerCase().endsWith(hash.toLowerCase())) openModal()

    // determine whether or not to update state upon route navigation
    function handleHashChange(url) {
      url.toLowerCase().endsWith(hash.toLowerCase()) ? openModal() : closeModal()
    }
    router.events.on("routeChangeComplete", handleHashChange)

    // allow users to close modal with escape key
    function closeModalWithEsc(e) {
      if (e.key === "Escape") closeModal()
    }
    document.addEventListener("keyup", closeModalWithEsc)

    return () => {
      setModal(false)
      router.events.off("routeChangeComplete", handleHashChange)
      document.removeEventListener("keyup", closeModalWithEsc)
      document.body.classList.remove("overflow-hidden")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return { isOpen, closeModal, openModal, focusRef }
}

export default useModal
