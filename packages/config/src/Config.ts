import { Config as ConfigContract } from '@micra/core';

export class Config implements ConfigContract {
  protected definitions = new Map<string, any>();

  has(key: string) {
    return this.get(key) !== undefined;
  }

  set(key: string, value: any) {
    const [namespace, ...parts] = key.split('.').reverse();
    const main = parts.pop();

    if (main) {
      this.definitions.set(
        main,
        parts.reduce((partial, subKey) => ({
          [subKey]: partial,
        }), { [namespace]: value }),
      );
    } else {
      this.definitions.set(namespace, value);
    }
  }

  get(key: string) {
    const [basename, ...pieces] = key.split('.');
    let definition = this.definitions.get(basename);
    for (const subKey of pieces) {
      if (!definition) {
        return undefined;
      }
      definition = definition[subKey];
    }

    return definition;
  }
}
