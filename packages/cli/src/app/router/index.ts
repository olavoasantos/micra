import { RouteMiddleware } from '@micra/core';
import { ServiceProvider } from '@micra/service-provider';
import { CLIRouter, CLICommand } from '@micra/cli-router';
import { cliHelpBlock } from '../cli-help-block/middlewares/cliHelpBlock';
import { commandHelpBlock } from '../cli-help-block/middlewares/commandHelpBlock';
import { versionHelpBlock } from '../cli-help-block/middlewares/versionHelpBlock';

export class RouterServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('Router', CLIRouter);
  }

  boot() {
    require('../../commands');

    const router = use<CLIRouter>('Router');

    router.registerMiddlewares(
      cliHelpBlock,
      commandHelpBlock,
      versionHelpBlock,
      ...config<RouteMiddleware[]>('middlewares', []),
    );

    config<CLICommand[]>('commands', []).forEach((command) => router.define(command));
  }
}
