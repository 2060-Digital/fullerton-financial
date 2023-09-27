# [SITE NAME]()

[DEPLOY STATUS BADGE]

The website for [SITE NAME].

[View Site Mockup(s)]() | [Visit Site]() | [Visit Site Dashboard]() | [Visit CMS Dashboard]() | [Visit Site Storybook]()

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
