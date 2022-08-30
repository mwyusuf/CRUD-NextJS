const withLess = require('next-with-less');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...withLess({
    lessLoaderOptions: {
      lessOptions: {
        javascriptEnabled: true,
        // modifyVars: themeVariables,
        localIdentName: '[path]___[local]___[hash:base64:5]',
      },
    },
  }),
}

module.exports = nextConfig
