import { Logger } from '@micra/core';
import chalk, { Chalk } from 'chalk';
import { ChalkLoggerExtension } from './types';

export class ChalkLogger implements Logger<any, ChalkLoggerExtension> {
  public config: any;
  public chalk: Chalk = chalk;
  protected namespace: string;

  constructor(config: any, namespace = '') {
    this.config = config || {};
    this.namespace = namespace;
  }

  create(namespace: string, options?: Partial<any> | undefined): Logger<any, ChalkLoggerExtension> {
    return new ChalkLogger(options, namespace);
  }

  error(message: any, ...args: any[]): void {
    console.log(chalk.red(message, ...args));
  }

  log(message: any, ...args: any[]): void {
    console.log(message, ...args);
  }

  info(message: any, ...args: any[]): void {
    console.log(chalk.blue(message, ...args));
  }

  warn(message: any, ...args: any[]): void {
    console.log(chalk.yellow(message, ...args));
  }

  trace(message: any, ...args: any[]): void {
    console.log(chalk.blackBright(message, ...args));
  }

  black(...args: any[]): void {
    console.log(chalk.black(...args));
  }

  red(...args: any[]): void {
    console.log(chalk.red(...args));
  }

  green(...args: any[]): void {
    console.log(chalk.green(...args));
  }

  yellow(...args: any[]): void {
    console.log(chalk.yellow(...args));
  }

  blue(...args: any[]): void {
    console.log(chalk.blue(...args));
  }

  magenta(...args: any[]): void {
    console.log(chalk.magenta(...args));
  }

  cyan(...args: any[]): void {
    console.log(chalk.cyan(...args));
  }

  white(...args: any[]): void {
    console.log(chalk.white(...args));
  }

  gray(...args: any[]): void {
    console.log(chalk.gray(...args));
  }

  grey(...args: any[]): void {
    console.log(chalk.grey(...args));
  }

  blackBright(...args: any[]): void {
    console.log(chalk.blackBright(...args));
  }

  redBright(...args: any[]): void {
    console.log(chalk.redBright(...args));
  }

  greenBright(...args: any[]): void {
    console.log(chalk.greenBright(...args));
  }

  yellowBright(...args: any[]): void {
    console.log(chalk.yellowBright(...args));
  }

  blueBright(...args: any[]): void {
    console.log(chalk.blueBright(...args));
  }

  magentaBright(...args: any[]): void {
    console.log(chalk.magentaBright(...args));
  }

  cyanBright(...args: any[]): void {
    console.log(chalk.cyanBright(...args));
  }

  whiteBright(...args: any[]): void {
    console.log(chalk.whiteBright(...args));
  }

  bgBlack(...args: any[]): void {
    console.log(chalk.bgBlack(...args));
  }

  bgRed(...args: any[]): void {
    console.log(chalk.bgRed(...args));
  }

  bgGreen(...args: any[]): void {
    console.log(chalk.bgGreen(...args));
  }

  bgYellow(...args: any[]): void {
    console.log(chalk.bgYellow(...args));
  }

  bgBlue(...args: any[]): void {
    console.log(chalk.bgBlue(...args));
  }

  bgMagenta(...args: any[]): void {
    console.log(chalk.bgMagenta(...args));
  }

  bgCyan(...args: any[]): void {
    console.log(chalk.bgCyan(...args));
  }

  bgWhite(...args: any[]): void {
    console.log(chalk.bgWhite(...args));
  }

  bgGray(...args: any[]): void {
    console.log(chalk.bgGray(...args));
  }

  bgGrey(...args: any[]): void {
    console.log(chalk.bgGrey(...args));
  }

  bgBlackBright(...args: any[]): void {
    console.log(chalk.bgBlackBright(...args));
  }

  bgRedBright(...args: any[]): void {
    console.log(chalk.bgRedBright(...args));
  }

  bgGreenBright(...args: any[]): void {
    console.log(chalk.bgGreenBright(...args));
  }

  bgYellowBright(...args: any[]): void {
    console.log(chalk.bgYellowBright(...args));
  }

  bgBlueBright(...args: any[]): void {
    console.log(chalk.bgBlueBright(...args));
  }

  bgMagentaBright(...args: any[]): void {
    console.log(chalk.bgMagentaBright(...args));
  }

  bgCyanBright(...args: any[]): void {
    console.log(chalk.bgCyanBright(...args));
  }

  bgWhiteBright(...args: any[]): void {
    console.log(chalk.bgWhiteBright(...args));
  }
}
