import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import cn from "classnames"
import Submenu from "components/Header/Submenu"
import UtilityBar from "components/Header/UtilityBar"
import CallToAction from "components/CallToAction"
import Logo from "public/assets/logo.svg"
import MenuButton from "public/assets/hamburger-menu.svg"
import Phone from "public/assets/header-phone.svg"
import getTelLink from "utilities/getTelLink"
import SearchBar from "components/SearchBar"

export default function Header({ header, utilityBar, phoneNumbers }) {
  const [mobileMenuVisibility, setMobileMenuVisibility] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState("")

  const router = useRouter()

  // close the menu when a link is clicked
  useEffect(() => {
    const handleRouteChange = () => {
      setMobileMenuVisibility(false)
      setOpenSubMenu("")
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    router.events.on("hashChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
      router.events.off("hashChangeComplete", handleRouteChange)
    }
  }, [router.events])

  // disable scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuVisibility) document.querySelector("html").style.overflow = "hidden"
    if (!mobileMenuVisibility) document.querySelector("html").style.overflow = ""
  }, [mobileMenuVisibility])

  const mobileMenuColor = mobileMenuVisibility ? "text-white" : "text-primary-1"

  return (
    <header
      className={cn({
        "bg-primary-1 xl:bg-white": mobileMenuVisibility,
      })}
    >
      <UtilityBar menu={utilityBar} />
      <section className="px-6 pt-5 pb-9 xl:py-11">
        <div className="flex flex-col xl:flex-row justify-between max-w-screen-xl items-center gap-4 mx-auto">
          <div className="flex items-center justify-between gap-4 w-full">
            <button
              className="hamburger-btn xl:hidden"
              aria-label={mobileMenuVisibility ? `close menu` : `open menu`}
              onClick={() => setMobileMenuVisibility((prev) => !prev)}
            >
              <MenuButton className={cn("cursor-pointer mx-auto", { open: mobileMenuVisibility })} />
              <span className={`text-center mx-auto ${mobileMenuColor}`}>
                {mobileMenuVisibility ? "Close" : "Menu"}
              </span>
            </button>
            <Link href="/">
              <Logo
                className={`w-[193px] sm:w-[233px] transition-all duration-200 xl:text-primary-1 ${mobileMenuColor}`}
              />
            </Link>
            <Link href={getTelLink(phoneNumbers?.primary)} className="xl:hidden">
              <div
                className={`flex flex-col justify-center items-center font-primary text-primary-1 ${mobileMenuColor}`}
              >
                <Phone className={mobileMenuColor} />
                Call
              </div>
            </Link>
          </div>
          <nav aria-label="Main" className="flex flex-col-reverse xl:flex-row items-center gap-9 w-full">
            <div
              className={cn(
                "menu pb-8 px-6 xl:p-0 m-0 xl:flex items-center absolute xl:static overflow-y-auto xl:overflow-visible w-full h-[calc(100vh-105px)] xl:h-full xl:w-auto top-64 left-0 z-50 bg-primary-1 xl:bg-white",
                {
                  "hidden xl:block": !mobileMenuVisibility,
                },
              )}
            >
              <Submenu
                {...{
                  menuItems: header,
                  currentPath: router.asPath,
                  openSubMenu,
                  setOpenSubMenu,
                  mobileMenuVisibility,
                }}
              />
            </div>
            <div
              className={cn("w-full flex justify-center", {
                hidden: !mobileMenuVisibility,
                "block xl:hidden": mobileMenuVisibility,
              })}
            >
              <SearchBar style="light" />
            </div>

            <CallToAction href="/contact" className="w-full sm:w-auto text-center whitespace-nowrap">
              Schedule a Meeting
            </CallToAction>
          </nav>
        </div>
      </section>
    </header>
  )
}
