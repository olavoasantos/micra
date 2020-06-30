import { useState } from 'react';
import { Compare, State } from '@micra/store-hooks';
import { useIsomorphicEffect, useIsMounted } from './helpers';

export const useStoreState = <T = any, U = T>(
  store: State<T>,
  selector: (state: T) => U = () => store.value as any,
  compare: Compare<U, U> = (prev, curr) => prev !== curr,
): { data: U; error?: Error } => {
  const isMounted = useIsMounted();
  const [value, setValue] = useState<{ data: U; error?: Error }>({
    data: selector(store.value),
    error: undefined,
  });

  useIsomorphicEffect(
    () =>
      store.subscribe<U>(
        (newValue, error) => {
          if (isMounted) {
            if (error) {
              setValue({
                ...value,
                error,
              });
            } else {
              setValue({
                ...value,
                data: selector(newValue as any),
              });
            }
          }
        },
        selector,
        compare,
      ),
    [selector, compare],
  );

  return value;
};
