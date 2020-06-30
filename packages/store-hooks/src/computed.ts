import { State, Compare } from './types';
import { storeEvent } from './storeEvent';

export const computed = <U, T = any>(
  store: State<T>,
  selector: (state: T) => U,
  shouldUpdate: Compare<U, U> = (state: U, update: U): boolean => state !== update,
): State<U> => {
  let $computed: U = selector(store.value);
  const event = storeEvent<U>($computed);

  store.subscribe<U>(
    (newValue) => {
      $computed = newValue as U;
      event.fire($computed);
    },
    selector,
    shouldUpdate,
  );

  return {
    subscribe: event.subscribe.bind(event),
    get value(): U {
      return $computed;
    },
  };
};
