import { useState } from 'react';
import { Compare, ValueState } from '@micra/store-hooks';
import { useIsomorphicEffect, useIsMounted } from './helpers';

export const useStore = <T = any, U = T>(
  store: ValueState<T>,
  selector: (state: T) => U = () => store.value as any,
  compare: Compare<U, U> = (prev, curr) => prev !== curr,
): [U, ValueState<T>['set']] => {
  const isMounted = useIsMounted();
  const [value, setValue] = useState(selector(store.value));

  useIsomorphicEffect(
    () =>
      store.subscribe<U>(
        (newValue) => {
          if (isMounted) {
            setValue(selector(newValue as any));
          }
        },
        selector,
        compare,
      ),
    [selector, compare],
  );

  return [value, store.set.bind(store)];
};
