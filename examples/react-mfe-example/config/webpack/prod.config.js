const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = (...paths) => resolve(__dirname, '../..', ...paths);

module.exports = (config) => {
  config.mode = 'prod';

  config.devtool = 'source-map';
  config.output.filename = '[name].[contenthash].js';
  config.module.rules.push({
    loader: 'source-map-loader',
    test: /\.js$/,
    exclude: /node_modules/,
    enforce: 'pre',
  });
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new HtmlWebpackPlugin({
      filename: root('build/index.html'),
      template: root('public', 'index.html'),
    }),
  ];
  config.optimization = {
    mangleWasmImports: true,
    mergeDuplicateChunks: true,
    minimize: true,
    nodeEnv: 'production',
  };

  return config;
}
