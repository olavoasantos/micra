const {
  group,
  performance,
  sourceMaps,
  css,
  devServer,
} = require('webpack-blocks');

module.exports = () =>
  group([
    devServer({
      compress: true,
      historyApiFallback: true,
      port: process.env.PORT || 3000,
    }),

    sourceMaps(),

    css.modules(),

    performance({
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000,
    }),
  ]);