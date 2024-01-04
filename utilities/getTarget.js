/**
 * Try to determine the correct target attribute for a given URI
 *
 * @param {string} href A URL or URL-like string
 * @returns {"self" | "_blank"} Returns target attribute for use in links
 */
export default function getTarget(href) {
  // Schemes and anchors...
  if (href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) return "_self"

  // True when relative, including cases where path doesn't begin with forward-slash.
  if (!/^(?:[a-z+]+:)?\/\//i.test(href)) {
    return "_self"
  }

  // By now we're down to FQDNs, so we test absolute URLs for this domain or give up and return "_blank"
  return new URL(href).host === process.env.NEXT_PUBLIC_SITE_URL ? "_self" : "_blank"
}
