import app, { AppConfig } from '@micra/application';
import { ReactDomKernel } from '@micra/react-dom-kernel';
import { TSyringeServiceContainer } from '@micra/tsyringe-service-container';
import { DomainServiceProvider } from 'app/domain';
import { RouterServiceProvider } from 'app/router';
import { TranslationServiceProvider } from 'app/translation';

app.config.set<AppConfig>('app', {
  /**
   * Service container class to be used.
   */
  container: TSyringeServiceContainer,

  /**
   * Application kernel
   */
  kernel: ReactDomKernel,

  /**
   * Service providers
   */
  services: [
    RouterServiceProvider,
    TranslationServiceProvider,
    DomainServiceProvider,
  ],
});
