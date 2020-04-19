import { EventListener } from './Event';

export interface Store<T = Record<string | number, any>> {
  state: T;
  connect(listener: EventListener<T>): () => void;
}
