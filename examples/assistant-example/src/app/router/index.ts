import { RouteMiddleware } from '@micra/core';
import { CLIRouter, CLICommand } from '@micra/cli-router';
import { ServiceProvider } from '@micra/service-provider';
import { commandHelpBlock } from 'app/cli-help-block/middlewares/commandHelpBlock';
import { cliHelpBlock } from 'app/cli-help-block/middlewares/cliHelpBlock';

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
