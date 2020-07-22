import { PersistOptions } from './types';
import { save, hydrate } from './helpers';
import { PREFIX, EXPIRATION } from './constants';

export const persist = ({ stores, expiration = EXPIRATION, prefix = PREFIX }: PersistOptions) => {
  Object.keys(stores).forEach(name => {
    const store = stores[name];
    const key = prefix + name;

    if (!hydrate(key, store)) {
      save(key, store.value, expiration);
    }

    store.on('update', (_, value) => save(key, value, expiration));
  });
};
