import { Context } from 'app/context/types';

export const cliHelpBlock = async ({ logger, route, parser, helpBlock, exit, router }: Context) => {
  if (parser.hasOption('help') || (parser.hasOption('h') && !route)) {
    if (config('app.description')) {
      helpBlock.printSection('Description:', config('app.description'));
      logger.log('');
    }

    helpBlock.printSection(
      'Usage:',
      [config('app.command', 'assistant'), '[command] [arguments] [options]']
        .filter(Boolean)
        .join(' '),
    );

    helpBlock.printList(
      '\nCommands:',
      router.routes().map((route) => ({
        title: route.path,
        description: route.routeDescription,
      })),
    );

    helpBlock.printList('\nOptions:', config('app.defaultOptions'));

    exit();
  }
};
