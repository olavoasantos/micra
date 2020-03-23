import { Environment, StaticEnvironment } from '@micra/core';

export class MultiEnv implements Environment {
  sources: Environment[] = [];

  addSources(...envs: StaticEnvironment[]) {
    envs.forEach(env => this.sources.push(new env()));
  }

  async init() {
    for (const env of this.sources) {
      await env.init();
    }
  }

  has(key: string) {
    return this.sources.some(env => env.has(key));
  }

  get(key: string) {
    for (const env of this.sources) {
      if (env.has(key)) {
        return env.get(key);
      }
    }
  }
}
