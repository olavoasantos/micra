import { state } from '../state';
import { computed } from '../computed';

describe('computed tests', () => {
  it('should return a computed value based on a state', () => {
    const counter = state(0);
    const double = computed(counter, (count) => count * 2);

    expect(counter.value).toBe(0);
    expect(double.value).toBe(0);

    counter.value = 2;

    expect(counter.value).toBe(2);
    expect(double.value).toBe(4);
  });
});
