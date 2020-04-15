import { inArray } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('inArray rule', () => {
  /** @test */
  it('should return true if the value is included in another field', () => {
    const context = mockContext({
      field: 'color',
      data: {
        color: '#ff0000',
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      },
    });
    expect(inArray('colors').check(context)).toBeTruthy();
  });

  /** @test */
  it('should return false if the value is not included in another field', () => {
    const context = mockContext({
      field: 'color',
      data: {
        color: '#ff00ff',
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      },
    });
    expect(inArray('colors').check(context)).toBeFalsy();
  });
});
