import { ValueState, Compare } from '@micra/store-hooks';
import { useStore } from './useStore';

export const createStoreHook = <T = any>(store: ValueState<T>) => <U = T>(
  selector: (state: T) => U = () => store.value as any,
  compare: Compare<U, U> = (prev, curr) => prev !== curr,
) => useStore<T, U>(store, selector, compare);
