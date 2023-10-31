# [Fullerton Financial Planning](https://fullerton-financial.netlify.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/6efd04d2-5c92-470b-aed5-55c979343819/deploy-status)](https://app.netlify.com/sites/fullerton-financial/deploys)

The website for [Fullerton Financial Planning](https://fullerton-financial.netlify.app/).

[View Site Mockup(s)](https://www.figma.com/file/Tjn2I1Iu1ISPREpnSNfntd/Site-Design?type=design&node-id=0-1&mode=design&t=gL4RA5tzX2oShZK7-0) | [Visit Site](https://fullerton-financial.netlify.app/) | [Visit Site Dashboard](https://app.netlify.com/sites/fullerton-financial/overview) | [Visit CMS Dashboard](https://app.storyblok.com/#/me/spaces/1017266/dashboard)

## Development

Create a file called .env.local and populate the following environment variables:

```
NEXT_PUBLIC_STORYBLOK_API_TOKEN =
NEXT_PUBLIC_SITE_URL =
```

The first can be obtained from the Settings > API Keys in the Storyblok Space for the given site.
The second is the main url of the site.

Clone down the repo and run:

```zsh
yarn dev
```
