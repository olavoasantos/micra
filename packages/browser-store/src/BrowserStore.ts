import { Store, EventListener } from '@micra/core';
import { Event } from '@micra/events';

export abstract class BrowserStore<T = any> implements Store<T> {
  protected abstract initialState: T;
  protected $state?: T;
  protected listeners: Event<T> = new Event(this.constructor.name);

  public get state() {
    if (!this.$state) this.$state = this.initialState;
    return this.$state;
  }

  protected setState(payload: T) {
    this.$state = payload;
    this.listeners.fire(this.$state);

    return this.$state;
  }

  public connect(listener: EventListener<T>): () => void {
    return this.listeners.register(listener);
  }
}
