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
  const primaryPhoneNumber = getTelLink(phoneNumbers?.primary);

  return (
    <header
      className={cn({
        "bg-primary-1 xl:bg-white": mobileMenuVisibility,
      })}
    >
      <UtilityBar menu={utilityBar ?? []} />
      <section className="px-6 pb-9 pt-5 xl:py-11">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 xl:flex-row">
          <div className="flex w-full items-center justify-between gap-4">
            <button
              className="hamburger-btn xl:hidden"
              aria-label={mobileMenuVisibility ? `close menu` : `open menu`}
              onClick={() => setMobileMenuVisibility((prev) => !prev)}
            >
              <MenuButton className={cn("mx-auto cursor-pointer", { open: mobileMenuVisibility })} />
              <span className={`mx-auto text-center ${mobileMenuColor}`}>
                {mobileMenuVisibility ? "Close" : "Menu"}
              </span>
            </button>
            <Link href="/">
              <Logo
                className={`w-[193px] transition-all duration-200 sm:w-[233px] xl:text-primary-1 ${mobileMenuColor}`}
              />
            </Link>
            {!!primaryPhoneNumber && <Link href={primaryPhoneNumber} className="justify-self-end sm:w-11 xl:hidden">
              <div
                className={`flex flex-col items-center justify-center font-primary text-primary-1 ${mobileMenuColor}`}
              >
                <Phone className={mobileMenuColor} />
                Call
              </div>
            </Link>}
          </div>
          <nav aria-label="Main" className="flex w-full flex-col-reverse items-center gap-9 xl:flex-row">
            <div
              className={cn(
                "menu absolute left-0 top-60 z-50 m-0 h-[calc(100vh-105px)] w-full items-center overflow-y-auto bg-primary-1 px-6 pb-8 xl:static xl:flex xl:h-full xl:w-auto xl:overflow-visible xl:bg-white xl:p-0",
                {
                  "hidden xl:block": !mobileMenuVisibility,
                },
              )}
            >
              <Submenu
                {...{
                  menuItems: header ?? [],
                  currentPath: router.asPath,
                  openSubMenu,
                  setOpenSubMenu,
                  mobileMenuVisibility,
                }}
              />
            </div>
            <div
              className={cn("flex w-full justify-center", {
                hidden: !mobileMenuVisibility,
                "block xl:hidden": mobileMenuVisibility,
              })}
            >
              <SearchBar style="light" />
            </div>

            <CallToAction href="/contact" className="w-full whitespace-nowrap text-center sm:w-auto">
              Schedule a Meeting
            </CallToAction>
          </nav>
        </div>
      </section>
    </header>
  )
}
