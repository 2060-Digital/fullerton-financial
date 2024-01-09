import Link from "next/link"
import { useState, useEffect } from "react"
import cn from "classnames"
import SingleMenuItem from "components/Header/SingleMenuItem"

import Logo from "public/assets/logo.svg"
import UtilityBar from "components/Header/UtilityBar"

import { getStoryblokLink } from "utilities/getStoryblokLink"
import CallToAction from "components/CallToAction"
import MenuButton from "public/assets/hamburger-menu.svg"
import { useRouter } from "next/router"
import getTarget from "utilities/getTarget"

export default function Header({ header, utilityBar }) {
  const [open, setMobileMenuVisibility] = useState(false)
  const router = useRouter()

  // close the menu when a link is clicked
  useEffect(() => {
    const handleRouteChange = () => setMobileMenuVisibility(false)
    router.events.on("routeChangeComplete", handleRouteChange)
    router.events.on("hashChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
      router.events.off("hashChangeComplete", handleRouteChange)
    }
  }, [router.events])

  // disable scroll when mobile menu is open
  useEffect(() => {
    if (open) document.querySelector("html").style.overflow = "hidden"
    if (!open) document.querySelector("html").style.overflow = ""
  }, [open])
  return (
    <header>
      <UtilityBar menu={utilityBar} />
      <section className="px-6">
        <div className="flex justify-between max-w-screen-xl mx-auto py-11">
          <Link href="/">
            <Logo className="text-primary-1" />
          </Link>
          <button
            className="lg:hidden"
            aria-label={open ? `close menu` : `open menu`}
            onClick={() => setMobileMenuVisibility((prev) => !prev)}
          >
            <MenuButton className={cn("mobile-menu-btn mt-1 cursor-pointer", { open })} />
          </button>
          <div
            className={cn(
              "py-8 px-10 lg:p-0 absolute overflow-scroll lg:overflow-visible lg:static w-full h-[calc(_100vh-105px)] lg:h-full lg:w-auto top-28 left-0 bg-blue-dark lg:bg-white font-bold z-50 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-0",
              {
                "hidden lg:flex": !open,
              },
            )}
          >
            <nav aria-label="Main" className="menu">
              <ul aria-label="Top-level Menu Items" className="m-0 lg:flex items-center">
                {header.map((item) => (
                  <SingleMenuItem currentPath={router.asPath} item={item} key={`menu-item-${item._uid}`} />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </header>
  )
}
