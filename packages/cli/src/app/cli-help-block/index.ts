import { ServiceProvider } from '@micra/service-provider';
import { CLIHelpBlock } from 'app/cli-help-block/CLIHelpBlock';

export class CLIHelpBlockServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('CLIHelpBlock', CLIHelpBlock);
  }
}
