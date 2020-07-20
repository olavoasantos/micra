const webpack = require('webpack');
const { join } = require('path');
const cssnano = require('cssnano');
const DotEnv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');
const typescript = require('webpack-blocks-ts');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const {
  group,
  env,
  createConfig,
  addPlugins,
  entryPoint,
  performance,
  setMode,
  setOutput,
  sourceMaps,
  babel,
  css,
  devServer,
  extractText,
  postcss,
  uglify,
  resolve,
} = require('webpack-blocks');

const root = (...path) => join(__dirname, '../..', ...path);

const base = () =>
  group([
    entryPoint(['react-hot-loader/patch', root('index.ts')]),
    babel(),
    setMode(process.env.NODE_ENV || 'development'),
    resolve({
      modules: ['node_modules', '.'],
    }),
    typescript({ configFile: root('tsconfig.json') }),
    addPlugins([
      new DotEnv({
        path: root('.env'),
        safe: true,
        allowEmptyValues: true,
        systemvars: true,
        silent: true,
        defaults: false,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: root('app/assets/index.html'),
      }),
    ]),
  ]);

const dev = () =>
  group([
    devServer(),
    sourceMaps(),
    css.modules(),
    performance({
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000,
    }),
  ]);

const prod = () =>
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

module.exports = createConfig([
  base(),
  env('development', [dev()]),
  env('production', [prod()]),
]);
