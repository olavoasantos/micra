require('./env');
const {
  env,
  createConfig,
} = require('webpack-blocks');
const dev = require('./webpack.dev');
const prod = require('./webpack.prod');
const base = require('./webpack.base');

module.exports = createConfig([
  base(),
  env('development', [dev()]),
  env('production', [prod()]),
]);
