import { singleton, inject } from '@micra/tsyringe-service-container';
import { AssistantCore, ContextGenerator } from '@micra/assistant-core';
import { CLIHelpBlock, CLIParser, Logger, Config } from '@micra/core';
import { CLIRouter } from '@micra/cli-router';

@singleton()
export class CLICore extends AssistantCore {
  constructor(
    @inject('config') config: Config,
    @inject('Logger') logger: Logger,
    @inject('Router') router: CLIRouter,
    @inject('CLIParser') parser: CLIParser,
    @inject('CLIHelpBlock') helpBlock: CLIHelpBlock,
    @inject('MakeContext') makeContext: ContextGenerator,
  ) {
    super(config, logger, router as any, parser, helpBlock, makeContext);
  }
}
