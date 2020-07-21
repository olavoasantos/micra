import { createBrowserHistory } from 'history';
import { Config } from '@micra/core';
import { router, ReactRouteRegistry } from '@micra/react-route-registry';
import { ServiceProvider } from '@micra/service-provider';
import { RouterConfig } from 'app/router/types';
import { pathTo } from 'app/router/helpers/pathTo';

export class RouterServiceProvider extends ServiceProvider {
  register() {
    this.container.value('pathTo', pathTo);
    this.container.value('router', router);
    this.container.value('router/history', createBrowserHistory());
  }

  boot() {
    const router = this.container.use<ReactRouteRegistry>('router');
    const config = this.container.use<Config>('config').get('router') as RouterConfig;

    if (config.prefix) {
      router.prefix(config.prefix);
    }

    if (config.middlewares) {
      router.middlewares(...config.middlewares);
    }

    require('pages');
  }
}
