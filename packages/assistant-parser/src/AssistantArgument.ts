import { CLIArgument, CLIArgumentSchema } from '@micra/core';

export class AssistantArgument implements CLIArgument {
  raw: string;
  index: number;
  value: any;
  name?: string;
  description?: string;

  constructor(index: number, raw?: string) {
    this.index = index;
    this.raw = raw ?? '';
    this.value = raw;
  }

  setIndex(index: number): this {
    this.index = index;

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

  hydrate(schema: CLIArgumentSchema): this {
    this.setName(schema.name);

    if (schema.description) {
      this.setDescription(schema.description);
    }

    if (this.value === undefined && schema.default !== undefined) {
      this.setValue(schema.default);
    }

    if (this.value === undefined && Boolean(schema.required)) {
      throw new Error(`Argument "${schema.name}" is required`);
    }

    if (schema.validate && !schema.validate(this.value)) {
      throw new Error(`Argument "${schema.name}" is invalid`);
    }

    if (schema.transform) {
      this.setValue(schema.transform(this.value));
    }

    return this;
  }
}
