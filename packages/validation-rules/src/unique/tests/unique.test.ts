import { unique } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('unique rule', () => {
  it('should return true if the array only contains objects with a unique key values', () => {
    const context = mockContext({
      field: 'field',
      data: {
        field: [
          { id: 1, name: 'JOHN DOE' },
          { id: 2, name: 'JANE DOE' },
        ],
      },
    });

    expect(unique({ keys: ['id'] }).check(context)).toBeTruthy();
  });

  it('should return false if the array contains objects with a duplicate key values', () => {
    const context = mockContext({
      field: 'field',
      data: {
        field: [
          { id: 1, name: 'JOHN DOE' },
          { id: 2, name: 'JANE DOE' },
          { id: 3, name: 'JOHN DOE' },
        ],
      },
    });

    expect(unique({ keys: ['name'] }).check(context)).toBeFalsy();
  });

  it('should return true if the array only contains unique values', () => {
    const context = mockContext({
      field: 'field',
      data: {
        field: ['VALUE', 'DIFFERENT VALUE'],
      },
    });
    expect(unique().check(context)).toBeTruthy();
  });

  it('should return false if the array contains duplicate values', () => {
    const context = mockContext({
      field: 'field',
      data: {
        field: ['VALUE', 'DUPLICATE VALUE', 'DUPLICATE VALUE'],
      },
    });
    expect(unique().check(context)).toBeFalsy();
  });
});
