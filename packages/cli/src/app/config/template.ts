import { Config } from '@micra/config';
import { pathToTemplate } from 'domains/template/helpers/pathToTemplate';

use<Config>('config').set('template', {
  micra: {
    config: pathToTemplate('micra/config.mustache'),
    cmd: pathToTemplate('micra/command.mustache'),
  }
});
