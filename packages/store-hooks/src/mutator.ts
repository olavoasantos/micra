import { ValueState } from './types';

export const mutator = <U extends Array<any> = any[], T = any>(
  store: ValueState<T>,
  transform: (state: T, ...arg: U) => Partial<T>,
) => (...arg: U) => store.set((state) => transform(state, ...arg));
