import { RouteMiddleware } from '@micra/core';
import { ServiceProvider } from '@micra/service-provider';
import { BrowserRouter } from '@micra/react-router-web-router';
import { createBrowserHistory } from 'history';
import { loadModules } from 'app/module-manager/middlewares/loadModules';
import { loadManifests } from 'app/module-manager/middlewares/loadManifests';

export class RouterServiceProvider extends ServiceProvider {
  middlewares: RouteMiddleware[] = [loadManifests, loadModules];

  register() {
    this.container.singleton('Router', BrowserRouter);
    this.container.value('app/router/history', createBrowserHistory({}));
  }

  boot() {
    const router = use<BrowserRouter>('Router');

    router.middlewares(...this.middlewares);

    // eslint-disable-next-line global-require
    require('pages');
  }
}
