import { Event, EventListener } from './Event';

export interface EventDispatcher {
  events: Record<string, Event>;
  on<T = any>(event: keyof this['events'], listener: EventListener<T>): () => void;
  dispatch(event: keyof this['events'], payload?: any): Promise<void>;
}
