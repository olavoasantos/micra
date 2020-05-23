import { ServiceProvider } from '@micra/service-provider';
import { CLICore } from './CLICore';

export class CLICoreServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('CLICore', CLICore);
  }
}
