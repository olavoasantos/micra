import { Context } from '../../context/types';

export const commandHelpBlock = async ({ logger, route, parser, helpBlock, exit }: Context) => {
  if ((parser.hasOption('help') || parser.hasOption('h')) && route) {
    if (route.routeDescription) {
      helpBlock.printSection('Description:', route.routeDescription);
      logger.log('');
    }

    helpBlock.printSection(
      'Usage:',
      [
        config('app.command', 'micra'),
        route.path,
        route.arguments.length > 0 ? '[arguments]' : undefined,
        route.options.length > 0 ? '[options]' : undefined,
      ]
        .filter(Boolean)
        .join(' '),
    );

    if (route.arguments.length > 0) {
      logger.log('');
      helpBlock.printList(
        'Arguments:',
        route.arguments.map((arg) => ({
          title: arg.name,
          description: [
            arg.description,
            arg.required ? ' (required)' : undefined,
            arg.default !== undefined ? ` (default: ${arg.default})` : undefined,
          ]
            .filter(Boolean)
            .join(' '),
        })),
      );
    }

    helpBlock.printList(
      '\nOptions:',
      route.options
        .map((option) => ({
          title: [`--${option.name}`, option.alias ? `-${option.alias}` : undefined]
            .filter(Boolean)
            .join(', '),
          description: [
            option.description,
            option.required ? ' (required)' : undefined,
            option.default ? ` [default: ${option.default}]` : undefined,
          ]
            .filter(Boolean)
            .join(' '),
        }))
        .concat(config('app.defaultOptions')),
    );

    exit();
  }
};
