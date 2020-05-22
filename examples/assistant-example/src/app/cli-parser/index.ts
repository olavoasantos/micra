import { AssistantParser } from '@micra/assistant-parser';
import { ServiceProvider } from '@micra/service-provider';

export class CLIParserServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('CLIParser', AssistantParser);
  }
}
