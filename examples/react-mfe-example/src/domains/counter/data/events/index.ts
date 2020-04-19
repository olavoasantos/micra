import { EventDispatcher } from '@micra/core';
import counter from 'domains/counter/data/store/CounterStore';
import {
  DECREMENT_COUNTER,
  DECREMENTED_COUNTER,
  INCREMENT_COUNTER,
  INCREMENTED_COUNTER,
} from 'domains/counter/data/events/constants';

const events = use<EventDispatcher>('EventDispatcher');

events.on(INCREMENT_COUNTER, (by: number = 1) => {
  counter.increment(by);
  events.dispatch(INCREMENTED_COUNTER, by);
});

events.on(DECREMENT_COUNTER, (by: number = 1) => {
  counter.decrement(by);
  events.dispatch(DECREMENTED_COUNTER, by);
});
