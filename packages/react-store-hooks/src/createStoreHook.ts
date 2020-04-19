import { useEffect, useState, useMemo } from 'react';
import { Store } from '@micra/core';

export const createStoreHook = function <S extends Store<any> = any>(store: S) {
  return <T = S['state']>(selector: (state: S['state']) => T = (s) => s): [T, S] => {
    const [state, setState] = useState(store.state);
    const computedState = useMemo(() => selector(state), [selector, state]);

    useEffect(() => store.connect(setState), [store]);

    return [computedState, store];
  };
};
