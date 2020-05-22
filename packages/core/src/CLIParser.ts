export interface CLIOptionSchema {
  name: string;
  alias?: string;
  description?: string;
  default?: any;
  required?: boolean;
  transform?(raw: string): any;
  validate?(raw: string): boolean;
}

export interface CLIOption {
  raw: string;
  value: any;
  name: string;
  alias?: string;
  description?: string;
  setAlias(alias: string): this;
  setValue(value: any): this;
  setName(name: string): this;
  setDescription(description: string): this;
  hydrate(schema: CLIOptionSchema): this;
}

export interface StaticCLIOption {
  new (argument: string): CLIOption;
  isOption(argument: string): boolean;
}

export interface CLIArgumentSchema {
  name: string;
  description?: string;
  default?: any;
  required?: boolean;
  transform?(raw: string): any;
  validate?(raw: string): boolean;
}

export interface CLIArgument {
  raw: string;
  index: number;
  value: any;
  name?: string;
  description?: string;
  setValue(value: any): this;
  setName(name: string): this;
  setDescription(description: string): this;
  hydrate(schema: CLIArgumentSchema): this;
}

export interface CLIParser {
  raw: string[];
  command?: string;
  options: CLIOption[];
  arguments: CLIArgument[];
  addOption(option: CLIOption): this;
  hasOption(name: string): boolean;
  getOption(name: string): CLIOption | undefined;
  countArguments(): number;
  hasArgument(index: number): boolean;
  getArgument(index: number): CLIArgument | undefined;
  addArgument(argument: CLIArgument): this;
}
