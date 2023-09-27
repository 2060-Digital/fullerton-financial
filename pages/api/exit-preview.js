export default async function exit(req, res) {
  const { slug = "", secret } = req.query
  // Exit the current user from "Preview Mode".
  res.clearPreviewData({ path: `/${slug}` })

  // we require the secret passed from the Storyblok preview pane to prevent open redirect vulnerabilities
  if (secret !== process.env.STORYBLOK_PREVIEW_TOKEN) {
    return res.status(403).json({ error: "invalid secret key" })
  }

  // set the cookies to None
  const cookies = res.getHeader("Set-Cookie")
  res.setHeader(
    "Set-Cookie",
    cookies.map((cookie) => cookie.replace("SameSite=Lax", "SameSite=None;Secure"))
  )

  res.writeHead(307, { Location: `/${slug}` })
  res.end()
}
