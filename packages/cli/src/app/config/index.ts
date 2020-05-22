import 'app/config/app';
import 'app/config/template';
import { existsSync } from 'fs';
import { Config } from '@micra/core';
import merge from 'lodash/merge';

config<string[]>('app.config', []).forEach((path) => {
  if (existsSync(path)) {
    Object.entries(require(path)).forEach(([key, value]) => {
      const appConfig = use<Config>('config');

      appConfig.set(
        key,
        appConfig.has(key) ? merge(appConfig.get(key), value) : value,
      );
    });
  }
});
