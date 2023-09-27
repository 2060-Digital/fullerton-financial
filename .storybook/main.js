const path = require("path")

module.exports = {
  stories: ["./stories/**/*.stories.mdx", "./stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
    "@storybook/testing-react",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  webpackFinal: async (config) => {
    config.resolve.modules = [path.resolve(__dirname, ".."), "node_modules"]

    // SVGR
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test(".svg"))
    fileLoaderRule.exclude = /\.svg$/i
    config.module.rules.push({
      test: /\.svg$/i,
      enforce: "pre",
      loader: require.resolve("@svgr/webpack"),
      exclude: /-background\.svg$/i,
    })

    config.module.rules.push({
      test: /-background\.svg$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[path][name][ext]",
      },
    })

    return config
  },
  framework: {
    name: "@storybook/nextjs",
    options: {
      nextConfigPath: path.resolve(__dirname, "../next.config.js"),
    },
  },
  core: {
    builder: "@storybook/builder-webpack5",
    disableTelemetry: true,
  },
  docs: {
    autodocs: true,
  },
}
