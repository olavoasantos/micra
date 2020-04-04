const dotenv = require('dotenv');
const { resolve } = require('path');
const webpack = require('webpack');
const externalModules = require('../../src/modules.json') || [];

dotenv.config();
const root = (...paths) => resolve(__dirname, '../..', ...paths);
const externals = externalModules.reduce((ext, mod) => {
  ext[mod.name] = `root window['${mod.alias || mod.name}']`;

  return ext;
}, {});

module.exports = {
  entry: {
    app: root('src/index.ts'),
  },
  devtool: '',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', 'src'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    path: root('build/scripts'),
    filename: 'index.js',
    libraryTarget: 'umd',
    publicPath: 'scripts/',
    umdNamedDefine: true,
  },
  optimization: {
    mangleWasmImports: true,
    mergeDuplicateChunks: true,
    minimize: true,
    nodeEnv: 'production',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
  externals,
};
