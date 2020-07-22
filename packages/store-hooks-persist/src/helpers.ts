import { ValueState, ComputedState } from '@micra/store-hooks';

export const getParent = (store: ValueState | ComputedState) => {
  let parent = store;
  while (parent.type === 'COMPUTED') {
    parent = parent.parent as ValueState | ComputedState;
  }

  return parent as ValueState;
};

export const getExpiration  = (expiration: number) => Date.now() + (expiration * 1000);

export const persistTo = (storage: Storage) => (key: string, value: any, expiration: number) => {
  storage.setItem(key, JSON.stringify({
    value,
    expiration: getExpiration(expiration),
  }));
};

export const hydrate = (storage: Storage, key: string, store: ValueState | ComputedState) => {
  const parent = getParent(store);
  const persisted = storage.getItem(key);
  if (persisted) {
    const { value, expiration } = JSON.parse(persisted);
    if (!expiration || expiration >= getExpiration(0)) {
      parent.set(value);
      return true;
    }
  }

  return false;
};
