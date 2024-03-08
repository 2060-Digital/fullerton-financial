export const getStoryblokLink = ({ href, anchor, linktype, cached_url, cachedUrl, url, story, email } = {}) => {
  // Asset Link
  if (linktype === "asset" && (url || href)) return url || href

  // Email Link
  if (linktype === "email") return `mailto:${email || url || href}`

  // Internal Link
  if (linktype === "story" && story?.full_slug) return relativizeToBase(story.full_slug)

  // Defined URL. Can be external or internal
  if (linktype === "url" && (url || href)) return url || href

  // inline links
  // if a link is inline within a rich text field then an href will be provided
  if (href !== null && href !== undefined && href !== "") return href

  // internal link
  // cached_url can be undefined if an internal link field is left blank
  if (linktype === "story" && cached_url !== "" && cached_url !== undefined) {
    return anchor ? `/${cached_url}#${anchor}` : `/${cached_url}`
  }

  // Don't ask me why, but Storyblok is inconsistent with this property's case.
  if (cached_url || cachedUrl || href) {
    return cached_url ?? cachedUrl ?? relativizeToBase(href)
  }

  return ""
}

const isRelative = (str) => !/^(?:[a-z+]+:)?\/\//.test(str)

// find only scheme/protocol-free relative URLs without forward slash and add them.
const relativizeToBase = (href) => {
  return href && isRelative(href) && (href.startsWith("/") ? href : `/${href}`)
}
