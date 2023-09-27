export const getStoryblokLink = ({ href, anchor, linktype, cached_url, cachedUrl, url, email } = {}) => {
  if (linktype === "email") return `mailto:${email || url || href}`

  // internal link
  if (linktype === "story" && cached_url !== "") {
    return anchor ? `/${cached_url}#${anchor}` : `/${cached_url}`
  }

  // Don't ask me why, but Storyblok is inconsistent with this property's case.
  if (cached_url || cachedUrl || href) {
    return cached_url ?? cachedUrl ?? href
  }

  return null
}
