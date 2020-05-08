import { setValue } from '../index';
import { mockContext } from '../../helpers/mockContext';

describe('setValue rule', () => {
  /** @test */
  it('should remove a given value from the final DTO', () => {
    const context = mockContext({
      field: 'field',
      data: {
        field: 'VALUE',
      },
      dto: {
        field: 'VALUE',
      },
    });

    expect(context.dto.field).not.toBeUndefined();

    setValue()(context);

    expect(context.dto.field).toBeUndefined();
  });
});
