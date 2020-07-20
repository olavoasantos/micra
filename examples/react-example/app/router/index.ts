import { ServiceProvider } from '@micra/service-provider';
import { router } from '@micra/react-route-registry';

export class RouterServiceProvider extends ServiceProvider {
  register() {
    this.container.value('router', router);
  }

  boot() {
    require('pages');
  }
}
