const dotenv = require('dotenv');
const { root } = require('./helpers');

dotenv.config({
  path: root('.env'),
});
