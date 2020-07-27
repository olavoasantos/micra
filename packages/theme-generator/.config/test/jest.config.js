const { join } = require('path');

const root = (...args) => join(__dirname, '../..', ...args);

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: root('tsconfig.json'),
    },
  },
  rootDir: root(),
  testRegex: '.*(/tests/|/.*/tests/).*\\.test\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [root('.config/test/setup.ts')],
};
