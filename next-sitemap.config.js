module.exports = {
  siteUrl: process.env.SITE_URL || process.env.VERCEL_URL || "SITE URL",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }, { userAgent: 'GPTBot', disallow: '/'}]
  }
}
