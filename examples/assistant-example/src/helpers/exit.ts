import { Logger } from '@micra/core';

export const exit = (error?: Error) => {
  const hrend = process.hrtime(global.hrstart);
  use<Logger>('Logger').log(`\n✨  Done in ${Math.ceil((hrend[1] - hrend[0]) / 1000000)}ms`);

  if (error) {
    process.exit(1);
  }
  process.exit();
};
