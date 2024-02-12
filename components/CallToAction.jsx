import NextLink from "next/link"
import cn from "classnames"
import getTarget from "utilities/getTarget"

export default function CallToAction({
  href,
  target = null,
  children,
  style = "primary",
  button = false,
  download = false,
  className,
  title = null,
  onClick,
}) {
  const styles = cn(
    "inline-block cursor-pointer max-w-full text-center", // default styles
    `${style}-link`,
    className,
  )

  if (button) {
    return (
      <button className={styles} title={title} onClick={onClick}>
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

  const targetValue = target ?? getTarget(href)

  return targetValue === "_self" ? (
    <NextLink
      href={href}
      data-type="route"
      target="_self"
      title={title}
      download={download}
      className={styles}
      onClick={onClick}
    >
      {children}
    </NextLink>
  ) : (
    <a
      data-type="external"
      className={styles}
      target={targetValue}
      title={title}
      download={download}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
