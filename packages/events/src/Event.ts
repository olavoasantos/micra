import { Event as EventInterface, EventListener } from '@micra/core';

export class Event<T = any> implements EventInterface<T> {
  name: string;
  listeners: EventListener<T>[];

  constructor(name: string) {
    this.name = name;
    this.listeners = [];
  }

  unregister(listener: EventListener<T>): void {
    this.listeners = this.listeners.filter((currentListener) => currentListener !== listener);
  }

  register(listener: EventListener<T>): () => void {
    this.listeners.push(listener);

    return () => this.unregister(listener);
  }

  async fire(payload?: T): Promise<void> {
    this.listeners.map((listener) => listener(payload as any));
  }
}
