import { useState } from 'react';
import { Compare, State } from '@micra/store-hooks';
import { useIsomorphicEffect, useIsMounted } from './helpers';

export const useStoreValue = <T = any, U = T>(
  store: State<T>,
  selector: (state: T) => U = () => store.value as any,
  compare: Compare<U, U> = (prev, curr) => prev !== curr,
): U => {
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

  return value;
};
