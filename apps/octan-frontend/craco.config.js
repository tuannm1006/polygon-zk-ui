/* craco.config.js */
const path = require(`path`);
const webpack = require('webpack');
const webpackResolve = require('craco-webpack-resolve');

module.exports = {
  plugins: [
    {
      plugin: webpackResolve,
      options: {
        resolve: {
          fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            url: require.resolve('url/'),
            assert: require.resolve('assert/'),
            buffer: require.resolve('buffer'),
          },
        },
      },
    },
  ],
  webpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
    ],
    ignoreWarnings: [/Failed to parse source map/],
    alias: {
      common: path.resolve(__dirname, 'src/common/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      layouts: path.resolve(__dirname, 'src/layouts/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      'shared-components': path.resolve(__dirname, 'src/shared-components/'),
      'app': path.resolve(__dirname, 'src/app/'),
      'contexts': path.resolve(__dirname, 'src/contexts/'),
      'mui-theme': path.resolve(__dirname, 'src/mui-theme/'),
      contracts: path.resolve(__dirname, 'src/contracts/'),
      swagger: path.resolve(__dirname, 'src/swagger/'),
      services: path.resolve(__dirname, 'src/services/'),
      consts: path.resolve(__dirname, 'src/consts/'),
    },
  },
};
