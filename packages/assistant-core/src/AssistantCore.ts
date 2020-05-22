import { Config, Logger, CLIHelpBlock, CLIParser } from '@micra/core';
import { AssistantArgument, AssistantOption } from '@micra/assistant-parser';
import { CLIRouter } from '@micra/cli-router';
import { ContextGenerator } from './types';
import { exit } from './helpers';

export class AssistantCore {
  constructor(
    protected config: Config,
    protected logger: Logger,
    protected router: CLIRouter,
    protected parser: CLIParser,
    protected helpBlock: CLIHelpBlock,
    protected makeContext: ContextGenerator,
  ) {}

  protected async generateContext(runtime: Record<string, any>) {
    const defaultContext = {
      exit,
      config: this.config,
      logger: this.logger,
      router: this.router,
      parser: this.parser,
      helpBlock: this.helpBlock,
      ...runtime,
    };

    return {
      ...defaultContext,
      ...(this.config.get('context') ?? {}),
      ...(await this.makeContext(defaultContext)),
    };
  }

  async run() {
    this.helpBlock.printHeader(
      this.config.get('app.name') ?? '',
      this.config.get('app.version') ?? '',
    );

    const route = this.router.find(this.parser.command ?? '');

    if (this.parser.command && !route) {
      throw new Error(`Command "${this.parser.command}" is not defined`);
    }

    const context = await this.generateContext({
      route,
    });

    for (const middleware of this.router.middlewares) {
      await middleware(context);
    }

    route?.arguments.forEach((arg, index) => {
      if (this.parser.hasArgument(index)) {
        this.parser.getArgument(index)?.hydrate(arg);
      } else {
        this.parser.addArgument(new AssistantArgument(index).hydrate(arg));
      }
    });

    route?.options.forEach((option) => {
      if (
        this.parser.hasOption(option.name) ||
        (option.alias && this.parser.hasOption(option.alias))
      ) {
        const opt =
          this.parser.getOption(option.name) ||
          (option.alias && this.parser.getOption(option.alias));

        if (opt) opt?.hydrate(option);
      } else {
        this.parser.addOption(new AssistantOption().hydrate(option));
      }
    });

    console.log(this.parser);

    for (const middleware of route?.middlewares ?? []) {
      await middleware(context);
    }

    await route?.handler(context);
  }
}
