import { EventDispatcher } from '../EventDispatcher';

describe('EventDispatcher tests', () => {
  it('should create a new event', () => {
    const dispatcher = new EventDispatcher();

    const event = dispatcher.createEvent('my event');

    expect(dispatcher.events).toMatchObject({ 'my event': event });
  });

  it('should not overwrite an event if the name already exists', () => {
    const dispatcher = new EventDispatcher();
    const event = dispatcher.createEvent('my event');

    const newEvent = dispatcher.createEvent('my event');

    expect(event).toMatchObject(newEvent);
  });

  it('should retrieve an event by its name', () => {
    const dispatcher = new EventDispatcher();
    const event = dispatcher.createEvent('my event');

    expect(dispatcher.find('my event')).toBe(event);
  });

  it('should create a new event if a given event does not exist', () => {
    const dispatcher = new EventDispatcher();

    const event = dispatcher.find('my event');

    expect(dispatcher.events).toMatchObject({ 'my event': event });
  });

  it('should register a listener on a given event', () => {
    const listener = jest.fn();
    const dispatcher = new EventDispatcher();
    const event = dispatcher.createEvent('my event');

    dispatcher.on('my event', listener);

    expect(event.listeners).toMatchObject([listener]);
  });

  it('should call a listener if a given event is fired', () => {
    const listener = jest.fn();
    const dispatcher = new EventDispatcher();

    dispatcher.createEvent('my event');
    dispatcher.on('my event', listener);
    dispatcher.dispatch('my event', 123);

    expect(listener).toHaveBeenCalledWith(123);
  });

  it('should not call a listener if it was unregistered', () => {
    const listener = jest.fn();
    const dispatcher = new EventDispatcher();
    dispatcher.createEvent('my event');

    const unregister = dispatcher.on('my event', listener);
    unregister();
    dispatcher.dispatch('my event', 123);

    expect(listener).not.toHaveBeenCalledWith(123);
  });
});
