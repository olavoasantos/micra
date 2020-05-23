import { ServiceProvider } from '@micra/service-provider';
import { CLIHelpBlock } from './CLIHelpBlock';

export class CLIHelpBlockServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('CLIHelpBlock', CLIHelpBlock);
  }
}
