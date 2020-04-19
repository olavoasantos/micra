import { EventDispatcher, EventListener } from '@micra/core';
import { useEffect } from 'react';

const events = use<EventDispatcher>('EventDispatcher');

export const useListener = <T = any>(event: string, listener: EventListener<T>) => {
  useEffect(() => events.on(event, listener), [event, listener]);
};
