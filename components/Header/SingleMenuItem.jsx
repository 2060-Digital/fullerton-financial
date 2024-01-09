import { useState } from "react"
import Link from "next/link"
import cn from "classnames"

import { getStoryblokLink } from "utilities/getStoryblokLink"
import getTarget from "utilities/getTarget"

export default function SingleMenuItem({ item, depth = 1, currentPath }) {
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
    <li className={classes}>
      {href ? (
        <Link
          href={href}
          className={cn("link block lg:inline-block cursor-pointer", {
            "current-page": currentPath === href,
          })}
          target={getTarget(href)}
        >
          <span className="whitespace-normal sm:whitespace-nowrap">{item.label}</span>
          <MobileAccordionToggle />
        </Link>
      ) : (
        <div
          className="nonlinked select-none"
          onClick={(e) => {
            e.stopPropagation()
            setSubMenuAccordionVisibility((prev) => !prev)
          }}
        >
          {item?.label}
          <MobileAccordionToggle />
        </div>
      )}
      {item?.nested_menu_items?.length ? (
        <ul
          className={cn("submenu lg:max-h-screen transition-all overflow-hidden lg:overflow-visible", {
            "max-h-screen transition-all": open,
            "max-h-0": !open,
          })}
        >
          {item?.nested_menu_items?.map((subItem) => (
            <SingleMenuItem
              currentPath={currentPath}
              depth={depth + 1}
              item={subItem}
              key={`menu-item-${subItem._uid}`}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
