import { BrowserStore } from '../BrowserStore';

describe('BrowserStore tests', () => {
  class CounterStore extends BrowserStore<number> {
    protected initialState = 0;

    public increment() {
      return this.setState(this.state + 1);
    }
  }

  it('should set the state to the initial state', () => {
    const counter = new CounterStore();

    expect(counter.state).toBe(0);
  });

  it('should modify the state using the setState function', () => {
    const counter = new CounterStore();

    counter.increment();

    expect(counter.state).toBe(1);
  });

  it('should notify listeners when the state is updated', () => {
    const listener = jest.fn();
    const counter = new CounterStore();

    counter.connect(listener);
    counter.increment();

    expect(listener).toHaveBeenCalledWith(1);
  });

  it('should not notify listeners if they were unregistered', () => {
    const listener = jest.fn();
    const counter = new CounterStore();

    const unregister = counter.connect(listener);
    unregister();
    counter.increment();

    expect(listener).not.toHaveBeenCalledWith(1);
  });
});
