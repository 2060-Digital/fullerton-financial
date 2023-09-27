import { useState, useEffect } from "react"
import Link from "next/link"
import cn from "classnames"

import { getStoryblokLink } from "utilities/getStoryblokLink"
import CallToAction from "components/CallToAction"
import MenuButton from "public/assets/hamburger-menu.svg"
import { useRouter } from "next/router"
import isInternalLink from "utilities/isInternalLink"

const SingleMenuItem = ({ item, depth = 1, currentPath }) => {
  const [open, setSubMenuAccordionVisibility] = useState(false)

  const classes = cn({
    "top-level": depth === 1,
  })

  const href = getStoryblokLink(item.link)

  const MobileAccordionToggle = () =>
    item?.nested_menu_items?.length > 0 ? (
      <button
        aria-label="expand submenu"
        className="lg:hidden font-bold p-2"
        onClick={(e) => {
          e.stopPropagation()
          setSubMenuAccordionVisibility((prev) => !prev)
        }}
      >
        {open ? "-" : "+"}
      </button>
    ) : null

  return (
    <li aria-label={item.label} className={classes}>
      {href ? (
        <Link
          href={href}
          className={cn("link block lg:inline-block cursor-pointer", {
            "current-page": currentPath === href,
          })}
          target={isInternalLink(href) ? "_self" : "_blank"}
        >
          <span className="whitespace-normal sm:whitespace-nowrap">{item.label}</span>
          <MobileAccordionToggle />
        </Link>
      ) : (
        <div
          aria-label={item.label}
          className="nonlinked select-none"
          onClick={(e) => {
            e.stopPropagation()
            setSubMenuAccordionVisibility((prev) => !prev)
          }}
        >
          {item.label}
          <MobileAccordionToggle />
        </div>
      )}
      <SubMenu currentPath={currentPath} {...{ ...item, open, depth }} />
    </li>
  )
}

const SubMenu = ({ nested_menu_items, label, open, depth, currentPath }) => {
  const submenu = cn("submenu lg:max-h-screen transition-all overflow-hidden lg:overflow-visible", {
    "max-h-screen transition-all": open,
    "max-h-0": !open,
  })

  return nested_menu_items.length ? (
    <ul aria-label={`${label} menu`} className={submenu}>
      {nested_menu_items.map((subItem) => (
        <SingleMenuItem currentPath={currentPath} depth={depth + 1} item={subItem} key={`menu-item-${subItem._uid}`} />
      ))}
    </ul>
  ) : null
}

export default function NavMenu({ menu, ...delegated }) {
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

  const Menu = () => (
    <div
      className={cn(
        "py-8 px-10 lg:p-0 absolute overflow-scroll lg:overflow-visible lg:static w-full h-[calc(_100vh-105px)] lg:h-full lg:w-auto top-28 left-0 bg-blue-dark lg:bg-white font-bold z-50 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-0",
        {
          "hidden lg:flex": !open,
        }
      )}
    >
      <nav aria-label="Main" className="menu" {...delegated}>
        <ul aria-label="Top-level Menu Items" className="m-0 lg:flex items-center">
          {menu.map((item) => (
            <SingleMenuItem currentPath={router.asPath} item={item} key={`menu-item-${item._uid}`} />
          ))}
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      <button
        className="lg:hidden"
        aria-label={open ? `close menu` : `open menu`}
        onClick={() => setMobileMenuVisibility((prev) => !prev)}
      >
        <MenuButton className={cn("mobile-menu-btn mt-1 cursor-pointer", { open })} />
      </button>
      <Menu />
    </>
  )
}
