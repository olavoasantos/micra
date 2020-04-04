const base = require('./config/webpack/base.config');
const dev = require('./config/webpack/dev.config');
const prod = require('./config/webpack/prod.config');

module.exports = (_env, { mode = 'development' }) =>
  ['production', 'prod'].includes(mode) ? prod(base) : dev(base);
