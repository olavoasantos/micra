import { noop } from './helpers';
import { StoreEvent, StateListener, StateSelector, Compare, Lifecycle } from './types';

const storeEvent = <T = undefined>(state?: T): StoreEvent<T> => {
  let activeEvent = 0;
  const listeners: Set<StateListener<T>> = new Set();
  const lifecycle: Map<string, Set<(...payload: any[]) => void>> = new Map([
    ['init', new Set()],
    ['update', new Set()],
    ['cancel', new Set()],
    ['error', new Set()],
    ['flush', new Set()],
  ]);

  const fire = (payload: T) => {
    let didBreak = false;
    const id = (activeEvent + 1) % 100;

    activeEvent = id;
    for (const listener of listeners) {
      if (activeEvent && activeEvent === id) {
        try {
          listener(payload);
        } catch (e) {
          fireLifecycle('error', e, state, payload);
        }
      } else {
        didBreak = true;
        fireLifecycle('cancel', state, payload);
        break;
      }
    }

    if (!didBreak) fireLifecycle('update', state, payload);
  };

  const createSubscription = function <V = T>(
    listener: StateListener<V>,
    selector: StateSelector<T, V> = (currState) => currState as any,
    shouldSync: Compare<V, V> = (prev, next) => prev !== next,
  ) {
    return {
      listener,
      selector,
      shouldSync,
      hasError: false,
      unsubscribe: noop,
      current: selector(state as T),
    };
  };

  const subscribe = (listener: StateListener<T>) => {
    listeners.add(listener);
    return () => unsubscribe(listener);
  };

  const unsubscribe = (listener: StateListener<T>) => {
    listeners.delete(listener);
  };

  const clear = () => {
    listeners.clear();
    fireLifecycle('flush', state);
  };

  const onLifecycle: StoreEvent<T>['onLifecycle'] = (
    event: Lifecycle,
    listener: (...payload: any[]) => void,
  ) => {
    if (lifecycle.has(event)) {
      lifecycle.get(event)?.add(listener);
      return () => lifecycle.get(event)?.delete(listener);
    }

    return noop;
  };

  const fireLifecycle: StoreEvent<T>['fireLifecycle'] = (event: string, ...payload: any[]) => {
    Promise.resolve().then(() => lifecycle.get(event)?.forEach((l) => l(...payload)));
  };

  return {
    fire,
    unsubscribe,
    clear,
    listeners,
    onLifecycle,
    fireLifecycle,
    subscribe<V = T>(
      listener: StateListener<V>,
      subSelector?: StateSelector<T, V>,
      shouldSync?: Compare<V, V>,
    ) {
      const subscription = createSubscription<V>(listener, subSelector, shouldSync);

      subscription.unsubscribe = subscribe((state) => {
        try {
          const nextState = subscription.selector(state as T);
          if (subscription.shouldSync(subscription.current, nextState)) {
            subscription.listener((subscription.current = nextState));
          }
        } catch (err) {
          subscription.hasError = true;
          subscription.listener(undefined, err);
        }
      });

      return subscription.unsubscribe;
    },
  };
};

export { storeEvent };
