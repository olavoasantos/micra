import { BrowserStore } from '@micra/browser-store';

export class CounterStore extends BrowserStore<number> {
  initialState = 0;

  increment(by = 1) {
    this.setState(this.state + by);
  }

  decrement(by = 1) {
    this.setState(this.state - by);
  }
}

export default new CounterStore();
