import { Kernel } from '@micra/kernel';
import { AssistantCore } from '@micra/assistant-core';
import { ChalkLogger } from '@micra/chalk-logger';

export class GenericKernel extends Kernel {
  run() {
    const logger = use<ChalkLogger>('Logger');
    use<AssistantCore>('CLICore')
      .run()
      .catch((e) => {
        logger.log(logger.chalk.bgRed.white(` ERROR `), logger.chalk.white(e.message));
      })
      .finally(() => {
        const hrend = process.hrtime(global.hrstart);
        logger.log(`\n✨  Done in ${Math.ceil((hrend[1] - hrend[0]) / 1000000)}ms`);
      });
  }
}
