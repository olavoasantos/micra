import { CLIParser, Logger, Config, CLIHelpBlock } from '@micra/core';
import { CLIRouter, CLIRoute } from '@micra/cli-router';

export interface DefaultContext {
  config: Config;
  logger: Logger;
  router: CLIRouter;
  parser: CLIParser;
  helpBlock: CLIHelpBlock;
  route?: CLIRoute;
  exit: () => void;
}

export type ContextGenerator = (context: DefaultContext) => Promise<Record<string, any>>;
