import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import createBabelConfig from './babel.config';
import pkg from '../../package.json';

const fromRoot = (...args) => path.join(__dirname, '../../', ...args);

const { root } = path.parse(process.cwd());
const external = (id) => !id.startsWith('.') && !id.startsWith(root);
const extensions = ['.js', '.ts', '.tsx'];
const getBabelOptions = (targets) => ({
  ...createBabelConfig({ env: (env) => env === 'build' }, targets),
  extensions,
});

function createESMConfig(input, output) {
  return {
    input,
    output: { file: output, format: 'esm' },
    external,
    plugins: [
      typescript({ tsconfig: fromRoot('tsconfig.json') }),
      babel(getBabelOptions({ node: 8 })),
      sizeSnapshot({ snapshotPath: fromRoot('.config/build/.size-snapshot.json') }),
      resolve({ extensions }),
    ],
  };
}

function createCommonJSConfig(input, output) {
  return {
    input,
    output: { file: output, format: 'cjs', exports: 'named' },
    external,
    plugins: [
      typescript({ tsconfig: fromRoot('tsconfig.json') }),
      babel(getBabelOptions({ ie: 11 })),
      sizeSnapshot({ snapshotPath: fromRoot('.config/build/.size-snapshot.json') }),
      resolve({ extensions }),
    ],
  };
}

function createIIFEConfig(input, output, globalName) {
  return {
    input,
    output: {
      file: output,
      format: 'iife',
      exports: 'named',
      name: globalName,
      globals: {
        react: 'React',
      },
    },
    external,
    plugins: [
      typescript({ tsconfig: fromRoot('tsconfig.json') }),
      babel(getBabelOptions({ ie: 11 })),
      sizeSnapshot({ snapshotPath: fromRoot('.config/build/.size-snapshot.json') }),
      resolve({ extensions }),
    ],
  };
}
const capitalize = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
const splitAndCapitalize = (...needles) => (value) =>
  needles.reduce(
    (parsed, needle) => parsed.split(needle).map(capitalize).join(''),
    value,
  );

export default [
  createESMConfig(fromRoot('index.ts'), fromRoot('.micra/index.js')),
  createCommonJSConfig(
    fromRoot('index.ts'),
    fromRoot('.micra/index.cjs.js'),
  ),
  createIIFEConfig(
    fromRoot('index.ts'),
    fromRoot('.micra/index.iife.js'),
    splitAndCapitalize('/', '-', '_')(pkg.name.replace('@', '')),
  ),
];
