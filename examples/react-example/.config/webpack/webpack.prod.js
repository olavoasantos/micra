const webpack = require('webpack');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
// const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const {
  group,
  addPlugins,
  setOutput,
  css,
  extractText,
  postcss,
  uglify,
} = require('webpack-blocks');
const { root } = require('./helpers');

module.exports = () =>
  group([
    uglify(),

    css.modules(),

    extractText('css/[name].[contenthash:hex:8].css'),

    setOutput({
      path: root('.micra'),
      filename: `index.[contenthash].js`,
    }),

    postcss({
      plugins: [autoprefixer(), cssnano()],
    }),

    addPlugins([
      new webpack.LoaderOptionsPlugin({ minimize: true }),
      // new SentryWebpackPlugin({
      //   include: '.',
      //   ignoreFile: '.sentrycliignore',
      //   ignore: ['node_modules', 'webpack.config.js'],
      //   configFile: 'sentry.properties'
      // }),
    ]),
  ]);
