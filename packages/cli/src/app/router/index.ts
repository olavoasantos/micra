import { RouteMiddleware } from '@micra/core';
import { ServiceProvider } from '@micra/service-provider';
import { CLIRouter, CLICommand } from '@micra/cli-router';
import { cliHelpBlock } from '../cli-help-block/middlewares/cliHelpBlock';
import { commandHelpBlock } from '../cli-help-block/middlewares/commandHelpBlock';

export class RouterServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('Router', CLIRouter);
  }

  boot() {
    require('commands');

    const router = use<CLIRouter>('Router');

    router.registerMiddlewares(
      cliHelpBlock,
      commandHelpBlock,
      ...config<RouteMiddleware[]>('middlewares', []),
    );

    config<CLICommand[]>('commands', []).forEach((command) => router.define(command));
  }
}
