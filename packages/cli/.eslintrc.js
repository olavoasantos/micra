const { join } = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/order': 'warn',
    'import/first': 'warn',
    'import/exports-last': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'error',
    'import/no-cycle': ['error', { maxDepth: 2 }],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [join(__dirname, 'src')],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
