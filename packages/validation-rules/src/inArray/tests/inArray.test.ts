import { inArray } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('inArray rule', () => {
  it('should return true if the value is included in another field', () => {
    const context = mockContext({
      field: 'color',
      data: {
        color: '#ff0000',
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      },
    });
    expect(inArray({ field: 'colors' }).check(context)).toBeTruthy();
  });

  it('should return false if the value is not included in another field', () => {
    const context = mockContext({
      field: 'color',
      data: {
        color: '#ff00ff',
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      },
    });
    expect(inArray({ field: 'colors' }).check(context)).toBeFalsy();
  });
});
