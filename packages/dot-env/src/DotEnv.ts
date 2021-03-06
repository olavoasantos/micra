import { Environment } from '@micra/core';
import dotenv from 'dotenv';

export class DotEnv implements Environment {
  protected definitions: Record<string, any> = {};

  async init() {
    this.definitions = Object.assign(
      this.definitions,
      { NODE_ENV: process.env.NODE_ENV },
      dotenv.config().parsed || {},
    );
  }

  has(key: string) {
    return Object.keys(this.definitions).includes(key);
  }

  get(key: string) {
    return this.definitions[key];
  }
}
