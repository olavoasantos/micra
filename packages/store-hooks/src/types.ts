export interface State<T = any> {
  value: T;
  type: 'VALUE' | 'COMPUTED';
  on: StoreEvent<T>['onLifecycle'];
  subscribe: StoreEvent<T>['subscribe'];
}

export interface ValueState<T = any> extends State<T> {
  type: 'VALUE';
  set(partial: Partial<T> | ((state: T) => Partial<T>)): T;
  reset(): T;
  flush: StoreEvent<T>['clear'];
}

export interface ComputedState<U = any, T = U> extends State<U> {
  type: 'COMPUTED';
  parent: State<T>;
}

export type StateSelector<T = undefined, U = T> = (state: T) => U;

export type StateListener<T> = (state?: T, error?: Error) => void;

export type Compare<T, U = any> = (state: T, update: U) => boolean;

export type Lifecycle = 'init' | 'update' | 'cancel' | 'error' | 'flush';

export interface StoreEvent<T = any> {
  listeners: Set<StateListener<T>>;
  fire: (payload: T) => void;
  subscribe<U = T>(
    listener: StateListener<U>,
    selector?: StateSelector<T, U>,
    shouldUpdate?: Compare<U, U>,
  ): () => void;
  unsubscribe: (listener: StateListener<T>) => void;
  clear: () => void;
  fireLifecycle: (event: string, ...payload: any[]) => void;
  onLifecycle(event: 'init', listener: (initial: T) => void): () => void;
  onLifecycle(event: 'update', listener: (previousState: T, nextState: T) => void): () => void;
  onLifecycle(event: 'cancel', listener: (state: T, cancelledState: T) => void): () => void;
  onLifecycle(
    event: 'error',
    listener: (error: Error, currentState: T, nextState: T) => void,
  ): () => void;
  onLifecycle(event: 'flush', listener: (state: T) => void): () => void;
  onLifecycle(
    event: Lifecycle,
    listener: (state: T | Error, prevOrNextState?: T, nextOrCancelledState?: T) => void,
  ): () => void;
}
