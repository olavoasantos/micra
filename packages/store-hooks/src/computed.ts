import { State, ComputedState, Compare } from './types';
import { storeEvent } from './storeEvent';

export const computed = <U, T = any>(
  store: State<T>,
  selector: (state: T) => U,
  shouldUpdate: Compare<U, U> = (state: U, update: U): boolean => state !== update,
): ComputedState<U, T> => {
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
    type: 'COMPUTED',
    subscribe: event.subscribe.bind(event),
    on: event.onLifecycle.bind(event),
    get value(): U {
      return $computed;
    },
    get parent(): State<T> {
      return store;
    },
  };
};
