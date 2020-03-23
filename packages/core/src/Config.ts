import { Static } from './types';

export interface Config {
  has(key: string): boolean;
  set(key: string, value: any): void;
  get<T = any>(key: string): T | undefined;
}

export type StaticConfig = Static<Config>;
