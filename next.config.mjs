import withPlaiceholder from "@plaiceholder/next"

/**
 * @type {import('next').NextConfig}
 */
const config = {
  productionBrowserSourceMaps: true,
  images: {
    domains: ["a-us.storyblok.com", "img.evbuc.com"],
  },
  webpack(config, { isServer }) {
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

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      }
    }

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
