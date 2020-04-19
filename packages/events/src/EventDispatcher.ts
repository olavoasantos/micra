import {
  EventDispatcher as EventDispatcherInterface,
  EventListener,
} from '@micra/core';
import { Event } from './Event';

export class EventDispatcher implements EventDispatcherInterface {
  events: Record<string, Event> = {};

  createEvent(name: string): Event {
    if (this.events[name]) {
      return this.events[name];
    }

    const event = new Event(name);
    this.events[name] = event;

    return event;
  }

  find(event: string): Event {
    return this.events[event] ?? this.createEvent(event);
  }

  on<T = any>(
    event: keyof this['events'],
    listener: EventListener<T>,
  ): () => void {
    return this.find(event as string).register(listener);
  }

  async dispatch(event: keyof this['events'], payload?: any): Promise<void> {
    const registeredEvent = this.events[event as string];
    if (registeredEvent) {
      return await registeredEvent.fire(payload);
    }
  }
}
