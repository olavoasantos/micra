import { createBrowserHistory } from 'history';
import { router } from '@micra/react-route-registry';
import { ServiceProvider } from '@micra/service-provider';
import { pathTo } from 'app/router/helpers/pathTo';

export class RouterServiceProvider extends ServiceProvider {
  register() {
    this.container.value('router', router);
    this.container.value('pathTo', pathTo);
    this.container.value('history', createBrowserHistory());
  }

  boot() {
    this.container.use('router').prefix('/:lng(fr)?');

    require('pages');
  }
}
