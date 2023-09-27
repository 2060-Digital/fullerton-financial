export default function isInternalLink(href) {
  // typical relative internal links
  if (href.startsWith("#") || href.startsWith("/")) return true

  // edge cases e.g. protocol-agnostic and other exotic protocols
  if (typeof window !== "undefined") {
    return new URL(href).host === window?.location.host
  }

  // SSR
  return true
}
