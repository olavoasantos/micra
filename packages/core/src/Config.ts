import { Static } from './types';

export interface Config {
  has(key: string): boolean;
  set<T = any>(key: string, value: T): void;
  get<T = any>(key: string): T | undefined;
}

export type StaticConfig = Static<Config>;
