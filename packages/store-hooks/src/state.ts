import { Compare, ValueState } from './types';
import { storeEvent } from './storeEvent';

export const state = <T = any>(
  initialState: T,
  shouldUpdate: Compare<T, T | Partial<T>> = (current, update) => current !== update,
): ValueState<T> => {
  const isObject = (value: T) =>
    typeof value === 'object' && value != null && !Array.isArray(value);
  const $initialState: T = isObject(initialState) ? { ...initialState } : initialState;
  let $state: T = isObject(initialState) ? { ...initialState } : initialState;
  const event = storeEvent<T>($state);

  event.fireLifecycle('init', $initialState);

  return {
    flush: event.clear.bind(event),
    on: event.onLifecycle.bind(event),
    subscribe: event.subscribe.bind(event),
    get value() {
      return $state;
    },
    set value(newState: T) {
      if (shouldUpdate($state, newState)) {
        $state = newState;
        event.fire($state);
      }
    },
    set(partial: Partial<T> | ((state: T) => Partial<T>)) {
      const newState = typeof partial === 'function' ? partial($state) : partial;

      if (shouldUpdate($state, newState)) {
        if (isObject($state)) {
          $state = Object.assign({}, $state, newState) as T;
        } else {
          $state = newState as T;
        }

        event.fire($state);
      }

      return $state;
    },
    reset() {
      $state = isObject($initialState) ? { ...$initialState } : $initialState;
      event.fire($state);

      return $state;
    },
  };
};
