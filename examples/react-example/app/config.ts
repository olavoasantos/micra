import app from '@micra/application';
import { TSyringeServiceContainer } from '@micra/tsyringe-service-container';
import { AppConfig } from 'app/types';

app.config.set<AppConfig>('app', {
  container: TSyringeServiceContainer,

  kernel: undefined,

  services: [
    //
  ],
});
