module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: './config/commit-lint/commitFormat',
  rules: {
    'header-max-length': [0],
    'subject-full-stop': [2, 'never'],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'upper-case'],
    'scope-enum': [2, 'always', [
      'ALPINE-STORE-HOOKS',
      'APOLLO-GRAPHQL-CONTAINER',
      'APOLLO-LAMBDA-KERNEL',
      'APPLICATION',
      'ASSISTANT-CORE',
      'ASSISTANT-EXAMPLE',
      'ASSISTANT-HELP-BLOCK',
      'ASSISTANT-PARSER',
      'BASE-EXAMPLE',
      'BASE',
      'BROWSER-COOKIE',
      'BROWSER-MODULE-MANAGER',
      'BROWSER-STORAGE-WRAPPER',
      'BROWSER-STORE',
      'CHALK-LOGGER',
      'CLI-ROUTER',
      'CLI',
      'CONFIG',
      'CORE',
      'DOT-ENV',
      'EVENTS',
      'IN-MEMORY-STORAGE',
      'KERNEL',
      'MULTI-ENV',
      'MUSTACHE-TEMPLATE-ENGINE',
      'PATH-MATCH',
      'REACT-DOM-KERNEL',
      'REACT-EXAMPLE',
      'REACT-ROUTE-REGISTRY',
      'REACT-ROUTER-WEB-ROUTER',
      'REACT-STORE-HOOKS',
      'ROUTE-REGISTRY',
      'SERVICE-PROVIDER',
      'STORAGE-WRAPPER',
      'STORE-HOOKS',
      'STORE-HOOKS-DEVTOOLS',
      'STORE-HOOKS-PERSIST',
      'TEST-UTILS',
      'TSYRINGE-SERVICE-CONTAINER',
      'VALIDATION-RULES',
      'VALIDATOR',
      'VUE-STORE-HOOKS',
      'WEB-ROUTER',
    ]],
    'type-case': [2, 'always', 'upper-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'CI',
        'DEPENDENCIES',
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
        'VERSION',
      ],
    ],
  },
};
