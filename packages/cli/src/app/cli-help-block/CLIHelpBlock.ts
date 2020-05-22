import { Logger } from '@micra/core';
import { singleton, inject } from '@micra/tsyringe-service-container';
import { AssistantHelpBlock } from '@micra/assistant-help-block';

@singleton()
export class CLIHelpBlock extends AssistantHelpBlock {
  constructor(@inject('Logger') logger: Logger) {
    super(logger);
  }
}
