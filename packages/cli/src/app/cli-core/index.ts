import { ServiceProvider } from '@micra/service-provider';
import { CLICore } from 'app/cli-core/CLICore';

export class CLICoreServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('CLICore', CLICore);
  }
}
