const { join } = require('path');

const root = (...path) => join(__dirname, '../..', ...path);

module.exports = {
  root,
};
