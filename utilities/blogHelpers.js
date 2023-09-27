// Default page size
export const BLOG_ARTICLES_PER_PAGE = 6

// Format a date from the CMS
export const formatBlogDate = (str) =>
  new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", day: "numeric" }).format(new Date(str))
