import NextLink from "next/link"
import cn from "classnames"
import isInternalLink from "utilities/isInternalLink"

export default function CallToAction({
  href,
  target = null,
  children,
  style = "primary",
  button = false,
  className,
  ...delegated
}) {
  const ctaStyles = {
    primary:
      "primary-link px-[38px] py-[20px] text-base sm:text-lg font-semibold bg-black text-white rounded-full no-underline",
    secondary:
      "secondary-link transition-all text-lg font-semibold underline underline-offset-8 decoration-black hover:no-underline decoration-4",
    tertiary: "tertiary-link hover:underline underline-offset-4 decoration-black decoration-solid",
  }
  const styles = cn(
    "text-center inline-block cursor-pointer max-w-full", // default styles
    ctaStyles[style],
    className
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

  const internal = isInternalLink(href)

  target = target ?? internal ? "_self" : "_blank"

  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    target = "_self"
  }

  return internal ? (
    <NextLink href={href} data-type="route" className={styles} {...delegated}>
      {children}
    </NextLink>
  ) : (
    <a data-type="external" className={styles} target={target} href={href} {...delegated}>
      {children}
    </a>
  )
}
