export default async function preview(req, res) {
  const { slug = "", secret } = req.query
  const params = req.url.split("?")

  // we prevent users from loading preview mode outside of Storyblok's preview pane or if the defined secret token from the preview pane URL doesn't match
  if (secret !== process.env.STORYBLOK_PREVIEW_TOKEN || req.headers["referer"] !== "https://app.storyblok.com/") {
    return res.status(403).json({ error: "invalid session" })
  }

  // Enable Preview Mode by setting the Next.js __prerender_bypass and __next_preview_data cookies
  // This forces requests to page to run server-side with getStaticProps' preview mode set to true
  res.setPreviewData(
    {},
    {
      maxAge: 60, // set the cookies to expire in one minute to limit error time if problem occurs or create long-lasting user confusion
      path: slug, // limit cookie to preview path to prevent site-wide client errors or site-wide preview mode
    },
  )

  // Set cookie to None, so it can be read in the Storyblok iframe
  const cookies = res.getHeader("Set-Cookie")
  res.setHeader(
    "Set-Cookie",
    cookies.map((cookie) => cookie.replace("SameSite=Lax", "SameSite=None;Secure")),
  )

  // log instance to function logs
  console.info(`Storyblok Editor Initialized: ${`${slug}?${params[1]}`}`)

  // Redirect to the path from entry
  res.redirect(`${slug}?${params[1]}`)
}
