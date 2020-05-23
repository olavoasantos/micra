import { ChalkLogger } from '@micra/chalk-logger';
import { Context } from '../../context/types';

export const versionHelpBlock = async ({ logger, parser, exit }: Context) => {
  if (parser.hasOption('version') || parser.hasOption('v')) {
    const chalk = (logger as ChalkLogger).chalk;

    logger.log(chalk.bgBlue.white(' version '), config('app.version'));

    exit();
  }
};
