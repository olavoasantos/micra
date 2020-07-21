import app, { AppConfig } from '@micra/application';
import { ReactDomKernel } from '@micra/react-dom-kernel';
import { TSyringeServiceContainer } from '@micra/tsyringe-service-container';
import { RouterServiceProvider } from 'app/router';
import { TranslationServiceProvider } from 'app/translation';

app.config.set<AppConfig>('app', {
  container: TSyringeServiceContainer,

  kernel: ReactDomKernel,

  services: [RouterServiceProvider, TranslationServiceProvider],
});
