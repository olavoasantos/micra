import { CLIHelpBlockListItem } from '@micra/core';
import { Context } from '../../context/types';

export const cliHelpBlock = async ({ logger, route, parser, helpBlock, exit, router }: Context) => {
  if (parser.hasOption('help') || (parser.hasOption('h') && !route)) {
    helpBlock.printHeader(config('app.name', 'micra'), config('app.version'));

    if (config('app.description')) {
      helpBlock.printSection('Description:', config('app.description'));
      logger.log('');
    }

    helpBlock.printSection(
      'Usage:',
      [config('app.command', 'micra'), '[command] [arguments] [options]'].filter(Boolean).join(' '),
    );

    helpBlock.printList(
      '\nCommands:',
      router.routes().map((route) => ({
        title: route.path,
        description: route.routeDescription,
      })),
    );

    helpBlock.printList(
      '\nOptions:',
      config<CLIHelpBlockListItem[]>('app.defaultOptions', []).concat([
        {
          title: `--version, -v`,
          description: 'Display CLI version',
        },
      ]),
    );

    exit();
  }
};
