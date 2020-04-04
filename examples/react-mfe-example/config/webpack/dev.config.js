const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = (...paths) => resolve(__dirname, '../..', ...paths);

module.exports = (config) => {
  config.mode = 'dev';
  config.devtool = 'source-map';
  config.output.filename = '[name]/index.js';
  config.module.rules.push({
    loader: 'source-map-loader',
    test: /\.js$/,
    exclude: /node_modules/,
    enforce: 'pre',
  });
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new HtmlWebpackPlugin({
      filename: root('build/index.html'),
      template: root('public', 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ];
  config.devServer = {
    contentBase: root('build'),
    publicPath: '/',
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: false,
      publicPath: false,
    },
  };
  config.optimization = {
    mangleWasmImports: true,
    mergeDuplicateChunks: true,
    minimize: false,
    nodeEnv: 'development',
  };

  return config;
}
