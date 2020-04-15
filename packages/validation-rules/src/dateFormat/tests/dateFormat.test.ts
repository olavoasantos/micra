import { dateFormat } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('dateFormat rule', () => {
  /** @test */
  it('should return true if a date has the correct format', () => {
    expect(
      dateFormat('DD-MM-YYYY').check(mockContext({ value: '26-09-2018' })),
    ).toBeTruthy();
    expect(
      dateFormat('MM/DD/YYYY').check(mockContext({ value: '09/26/2018' })),
    ).toBeTruthy();
  });

  /** @test */
  it('should return false if a date does not have the correct format', () => {
    expect(
      dateFormat('YYYY-MM-DD').check(mockContext({ value: '26-09-2018' })),
    ).toBeFalsy();
    expect(
      dateFormat('MM-DD-YYYY').check(mockContext({ value: '09/26/2018' })),
    ).toBeFalsy();
  });
});
