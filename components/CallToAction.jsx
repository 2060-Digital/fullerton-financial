import NextLink from "next/link"
import cn from "classnames"
import getTarget from "utilities/getTarget"

export default function CallToAction({
  href,
  target = null,
  children,
  style = "primary",
  button = false,
  className,
  ...delegated
}) {
  const styles = cn(
    "inline-block cursor-pointer max-w-full text-center", // default styles
    `${style}-link`,
    className,
  )

  if (button) {
    return (
      <button className={styles} {...delegated}>
        {children}
      </button>
    )
  }

  if (!href)
    return (
      <span data-type="invalid-link" className={styles}>
        {children}
      </span>
    )

  const internal = getTarget(href)

  return internal === "_self" ? (
    <NextLink href={href} data-type="route" target="_self" className={styles} {...delegated}>
      {children}
    </NextLink>
  ) : (
    <a data-type="external" className={styles} target={target} href={href} {...delegated}>
      {children}
    </a>
  )
}
