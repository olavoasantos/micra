import { PersistOptions } from './types';
import { persistTo, hydrate } from './helpers';
import { PREFIX, EXPIRATION } from './constants';

export const persist = ({ stores, expiration = EXPIRATION, prefix = PREFIX, to = localStorage }: PersistOptions) => {
  const save = persistTo(to);
  Object.keys(stores).forEach(name => {
    const store = stores[name];
    const key = prefix + name;

    if (!hydrate(to, key, store)) {
      save(key, store.value, expiration);
    }

    store.on('update', (_, value) => save(key, value, expiration));
  });
};
