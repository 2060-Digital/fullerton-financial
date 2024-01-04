import withPlaiceholder from "@plaiceholder/next"

/**
 * @type {import('next').NextConfig}
 */
const config = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ["a-us.storyblok.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [],
            },
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    })

    return config
  },
  generateBuildId: () => "build",
}

export default withPlaiceholder(config)
