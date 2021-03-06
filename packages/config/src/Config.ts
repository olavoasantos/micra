import { Config as ConfigContract } from '@micra/core';
import { deepMerge } from './helpers';

export class Config implements ConfigContract {
  protected definitions = new Map<string, any>();

  has(key: string) {
    return this.get(key) !== undefined;
  }

  set<T = any>(key: string, value: T) {
    const [namespace, ...parts] = key.split('.').reverse();
    const main = parts.pop();

    if (main) {
      const curr = this.definitions.get(main);
      const tree = parts.reduce(
        (partial, subKey) => ({
          [subKey]: partial,
        }) as any,
        { [namespace]: value },
      );

      this.definitions.set(main, curr ? deepMerge(curr, tree) : tree);
    } else {
      const curr = this.definitions.get(namespace);
      this.definitions.set(namespace, curr ? deepMerge(curr, value) : value);
    }
  }

  get<T = any>(key: string): T | undefined {
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
