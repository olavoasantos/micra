import { join } from 'path';
import { Config } from '@micra/config';

use<Config>('config').set('app', {
  name: 'micra',
  version: require('../../../package.json').version,
  description: require('../../../package.json').description,
  config: [
    join(require('os').homedir(), 'micra.config.js'),
    join(require('os').homedir(), 'micra.config.json'),
    join(require('os').homedir(), '.micrarc'),
    join(require('os').homedir(), '.micrarc.js'),
    join(process.cwd(), 'micra.config.js'),
    join(process.cwd(), 'micra.config.json'),
    join(process.cwd(), '.micrarc'),
    join(process.cwd(), '.micrarc.js'),
  ],
  defaultOptions: [
    {
      title: `--help, -h`,
      description: 'Display information about the CLI or about a command',
    },
  ],
});
