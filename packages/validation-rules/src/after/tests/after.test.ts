import { after } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('after rule', () => {
  it('should return true when a date is after another date', () => {
    expect(after({ date: '2013-04-28' }).check(mockContext({ value: '2013-04-29' }))).toBeTruthy();
  });

  it('should return false when a date is equal to another date', () => {
    expect(after({ date: '2013-04-29' }).check(mockContext({ value: '2013-04-29' }))).toBeFalsy();
  });

  it('should return false when a date is before another date', () => {
    expect(after({ date: '2013-04-30' }).check(mockContext({ value: '2013-04-29' }))).toBeFalsy();
  });
});
