import { ServiceProvider } from '@micra/service-provider';
import { EventDispatcher } from '@micra/events';

export class EventsServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('EventDispatcher', EventDispatcher);
  }

  boot() {
    // eslint-disable-next-line global-require
    require('domains');
  }
}
