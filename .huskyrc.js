const tasks = (...arr) => arr.join(' && ');

module.exports = {
  hooks: {
    'commit-msg': tasks('commitlint -E HUSKY_GIT_PARAMS'),
    'pre-commit': tasks(
      'yarn bootstrap',
      'yarn format',
      'yarn lint',
      'yarn test',
    ),
  },
};
