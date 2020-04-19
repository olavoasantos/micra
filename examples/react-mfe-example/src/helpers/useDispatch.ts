import { EventDispatcher } from '@micra/core';

const events = use<EventDispatcher>('EventDispatcher');

export const useDispatch = () => events.dispatch.bind(events);
