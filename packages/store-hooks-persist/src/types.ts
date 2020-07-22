import { ValueState, ComputedState } from '@micra/store-hooks';

export interface PersistOptions {
  stores: Record<string, ValueState | ComputedState>;
  to?: Storage;
  prefix?: string;
  expiration?: number;
}
