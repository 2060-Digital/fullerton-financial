import Link from "next/link"
import cn from "classnames"
import { getStoryblokLink } from "utilities/getStoryblokLink"
import getTarget from "utilities/getTarget"

export default function Submenu({
  depth = 1,
  currentPath,
  menuItems,
  openSubMenu,
  setOpenSubMenu,
  mobileMenuVisibility,
}) {
  return (
    <ul>
      {menuItems.map((item) => {
        const href = getStoryblokLink(item.link)

        return (
          <li
            className={cn({
              "top-level": depth === 1,
              "open-second-level": depth === 1 && openSubMenu === item?.label,
              "second-level": depth === 2,
            })}
            onClick={(e) => {
              if (window.innerWidth >= 1280) return
              e.stopPropagation()
              setOpenSubMenu((prev) => (prev !== item?.label ? item?.label : ""))
            }}
            onKeyDown={(e) => {
              if (window.innerWidth >= 1280) return
              e.stopPropagation()
              if (e.code === "Enter") {
                setOpenSubMenu((prev) => (prev !== item?.label ? item?.label : ""))
              }
            }}
            key={`menu-item-${item._uid}`}
          >
            {href ? (
              <Link
                href={href}
                className={cn({
                  "current-page": currentPath === href,
                })}
                target={getTarget(href)}
              >
                {item.label}
              </Link>
            ) : (
              <div className="nonlinked" tabIndex="0">
                {item?.label}
              </div>
            )}
            {depth === 1 && item?.nested_menu_items?.length ? (
              <Submenu
                {...{
                  menuItems: item.nested_menu_items,
                  currentPath,
                  openSubMenu,
                  depth: 2,
                  setOpenSubMenu,
                  mobileMenuVisibility,
                }}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
