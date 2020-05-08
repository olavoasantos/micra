import { required, isString } from '@micra/validation-rules';
import { validate } from '../index';

it('should return the DTO and not contain any errors', () => {
  const data = {
    field: '123',
    a: 123,
  };

  const [DTO, error] = validate<{ field: string }>(data, {
    field: [required(), isString()],
  });

  expect(error.hasAny()).toBeFalsy();
  expect(DTO.field).toBe(data.field);
  expect((DTO as any).a).toBeUndefined();
});
