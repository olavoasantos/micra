import { Event } from '../Event';

describe('Event tests', () => {
  it('should register an event', async () => {
    const event = new Event('Event');
    const listener = jest.fn();

    event.register(listener);

    expect(event.listeners).toMatchObject([listener]);
  });

  it('should call a listener when an event is fired', async () => {
    const event = new Event<number>('Event');
    const listener = jest.fn();

    event.register(listener);
    await event.fire(123);

    expect(listener).toHaveBeenCalledWith(123);
  });

  it('should not call a listener that is unregistered', async () => {
    const event = new Event<number>('Event');
    const listener = jest.fn();
    const unregister = event.register(listener);

    unregister();
    await event.fire(123);

    expect(listener).not.toHaveBeenCalledWith(123);
  });
});
