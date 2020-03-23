import { Static } from './types';

export interface Environment {
  init(): Promise<void>;
  has(key: string): boolean;
  get(key: string): string | undefined;
}

export type StaticEnvironment = Static<Environment>;
