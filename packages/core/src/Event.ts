export type EventListener<T = undefined> = (payload: T) => void | Promise<void>;

export interface Event<T = undefined> {
  name: string;
  listeners: EventListener<T>[];
  unregister(listener: EventListener<T>): void;
  register(listener: EventListener<T>): () => void;
  fire(payload: T): Promise<void>;
}
