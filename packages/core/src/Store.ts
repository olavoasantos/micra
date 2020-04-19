import { EventListener } from './Event';

export interface Store<T = any> {
  state: T;
  connect(listener: EventListener<T>): () => void;
}
