const DotEnv = require('dotenv-webpack');
const typescript = require('webpack-blocks-ts');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  group,
  addPlugins,
  entryPoint,
  setMode,
  babel,
  resolve,
} = require('webpack-blocks');
const { root } = require('./helpers');

module.exports = () =>
  group([
    babel(),

    setMode(process.env.NODE_ENV || 'development'),

    typescript({ configFile: root('tsconfig.json') }),

    entryPoint(['react-hot-loader/patch', root('index.ts')]),

    resolve({
      modules: ['node_modules', '.'],
    }),

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
        base: '/',
        template: root('app/assets/index.html'),
      }),
    ]),
  ]);
