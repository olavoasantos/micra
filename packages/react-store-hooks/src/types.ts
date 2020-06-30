import { Compare, StateSelector } from '@micra/store-hooks';

export interface Subscriber<T = any, U = T> {
  value: U;
  compare: Compare<U>;
  selector: StateSelector<T, U>;
}
