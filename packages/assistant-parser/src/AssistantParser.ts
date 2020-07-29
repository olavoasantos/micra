import { CLIParser, CLIOption, CLIArgument } from '@micra/core';
import { AssistantOption } from './AssistantOption';
import { AssistantArgument } from './AssistantArgument';

export class AssistantParser implements CLIParser {
  raw: string[];
  command?: string;
  options: CLIOption[] = [];
  arguments: CLIArgument[] = [];

  constructor() {
    this.raw = process.argv;
    this.raw.slice(2).forEach((arg, index) => {
      if (AssistantOption.isOption(arg)) {
        return this.addOption(new AssistantOption(arg));
      }

      if (!this.command) {
        return (this.command = arg);
      }

      this.addArgument(new AssistantArgument(this.arguments.length, arg));
    });
  }

  addOption(option: CLIOption): this {
    this.options.push(option);

    return this;
  }

  hasOption(name: string): boolean {
    return this.options.some(
      (option) => option.name === name || (option.alias && option.alias === name),
    );
  }

  getOption(name: string): CLIOption | undefined {
    return this.options.find(
      (option) => option.name === name || (option.alias && option.alias === name),
    );
  }

  hasArgument(index: number): boolean {
    return index > -1 && this.arguments.some((arg) => arg.index === index);
  }

  countArguments(): number {
    return this.arguments.length;
  }

  getArgument(index: number): CLIArgument | undefined {
    if (index < 0) return;

    return this.arguments.find((arg) => arg.index === index);
  }

  addArgument(argument: CLIArgument): this {
    this.arguments.push(argument);

    return this;
  }
}
