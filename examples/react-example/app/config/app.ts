import app, { AppConfig } from '@micra/application';
import { ReactDomKernel } from '@micra/react-dom-kernel';
import { TSyringeServiceContainer } from '@micra/tsyringe-service-container';

app.config.set<AppConfig>('app', {
  container: TSyringeServiceContainer,

  kernel: ReactDomKernel,

  services: [
    //
  ],
});
