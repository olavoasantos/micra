import { join } from 'path';
import { Config } from '@micra/config';

use<Config>('config').set('app', {
  name: require('../../../package.json').name,
  version: require('../../../package.json').version,
  description: require('../../../package.json').description,
  config: [
    join(require('os').homedir(), 'assistant.config.js'),
    join(require('os').homedir(), 'assistant.config.json'),
    join(require('os').homedir(), '.assistantrc'),
    join(require('os').homedir(), '.assistantrc.js'),
    join(process.cwd(), 'assistant.config.js'),
    join(process.cwd(), 'assistant.config.json'),
    join(process.cwd(), '.assistantrc'),
    join(process.cwd(), '.assistantrc.js'),
  ],
  defaultOptions: [
    {
      title: `--help, -h`,
      description: 'Display information about the CLI or about a command',
    },
  ],
});
