import { ServiceProvider } from '@micra/service-provider';
import { Logger } from 'app/logger/Logger';

export class LoggerServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('Logger', Logger);
  }
}
