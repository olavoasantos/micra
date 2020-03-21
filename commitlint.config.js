module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: './config/commit-lint/commitFormat',
  rules: {
    'header-max-length': [0],
    'subject-full-stop': [2, 'never'],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'upper-case'],
    'scope-enum': [2, 'always', [
      'BASE',
    ]],
    'type-case': [2, 'always', 'upper-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'CI',
        'DOCS',
        'FEAT',
        'FIX',
        'IMPROVE',
        'LINT',
        'PERF',
        'REFACTOR',
        'REVERT',
        'STYLE',
        'TEST',
        'TODO',
      ],
    ],
  },
};
