import app from '@micra/application';
import { ReactDomKernel } from '@micra/react-dom-kernel';
import { TSyringeServiceContainer } from '@micra/tsyringe-service-container';
import { AppConfig } from 'app/types';

app.config.set<AppConfig>('app', {
  container: TSyringeServiceContainer,

  kernel: ReactDomKernel,

  services: [
    //
  ],
});
