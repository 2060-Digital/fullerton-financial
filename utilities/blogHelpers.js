// Default page size
export const BLOG_ARTICLES_PER_PAGE = 12

// Format a date from the CMS
export const formatBlogDate = (str, locale = "en-UK", month = "short") =>
  new Intl.DateTimeFormat(locale, { month, year: "numeric", day: "numeric" }).format(new Date(str))
