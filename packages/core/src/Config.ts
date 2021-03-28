import { Static } from './types';

export interface Config {
  has(key: string): boolean;
  set<K extends keyof Application.Config, T extends Application.Config[K]>(key: K, value: T): void;
  get<K extends keyof Application.Config, T extends Application.Config[K]>(key: K): T | undefined;
  get<K extends keyof Application.Config, T extends Application.Config[K]>(key: K, fallback: T): T;
}

export type StaticConfig = Static<Config>;
