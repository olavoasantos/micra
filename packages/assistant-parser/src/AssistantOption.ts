import { CLIOption, CLIOptionSchema } from '@micra/core';

export class AssistantOption implements CLIOption {
  raw: string;
  value: any;
  name = '';
  alias?: string;
  description?: string;

  static isOption(argument: string) {
    return argument.startsWith('--') || argument.startsWith('-');
  }

  constructor(raw = '') {
    this.raw = raw;

    if (raw) {
      const [name, value] = raw.split('=');
      this.value = value !== undefined ? value : true;
      if (name.startsWith('--')) {
        this.name = name.substr(2);
      } else {
        this.alias = name.substr(1);
      }
    }
  }

  setAlias(alias: string): this {
    this.alias = alias;

    return this;
  }

  setValue(value: any): this {
    this.value = value;

    return this;
  }

  setName(name: string): this {
    this.name = name;

    return this;
  }

  setDescription(description: string): this {
    this.description = description;

    return this;
  }

  hydrate(schema: CLIOptionSchema): this {
    this.setName(schema.name);

    if (schema.description) {
      this.setDescription(schema.description);
    }

    if (schema.alias) {
      this.setAlias(schema.alias);
    }

    if (this.value === undefined && schema.default !== undefined) {
      this.setValue(schema.default);
    }

    if (this.value === undefined && Boolean(schema.required)) {
      throw new Error(`Option "${schema.name}" is required`);
    }

    if (schema.validate && !schema.validate(this.value)) {
      throw new Error(`Option "${schema.name}" is invalid`);
    }

    if (schema.transform) {
      this.setValue(schema.transform(this.value));
    }

    return this;
  }
}
