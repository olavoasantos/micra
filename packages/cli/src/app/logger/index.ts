import { ServiceProvider } from '@micra/service-provider';
import { Logger } from './Logger';

export class LoggerServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('Logger', Logger);
  }
}
