import { storeEvent } from '../storeEvent';

describe('storeEvent tests', () => {
  function wait() {
    return new Promise((resolve) => setImmediate(resolve));
  }
  it('should cancel an event', () => {
    let i = 1;
    const event = storeEvent(i);

    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const increment = () => (i += 1);
    const onIIs1 = () => (i === 2 ? event.fire(i) : undefined);

    event.subscribe(increment);
    event.subscribe(spy1);
    event.subscribe(onIIs1);
    event.subscribe(spy2);

    event.fire(0);

    expect(spy1).toHaveBeenCalledTimes(2);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should catch an error on the listener', async () => {
    const event = storeEvent(0);
    const errorSpy = jest.fn();
    const error = new Error('whoops');

    event.onLifecycle('error', errorSpy);
    event.subscribe(() => { throw error });

    event.fire(1);

    await wait();

    expect(errorSpy).toHaveBeenCalledWith(error, 0, 1);
  });
});
