import { validate, ValidationError } from '@micra/validator';
import { required, isString } from '@micra/validation-rules';
import { DeleteTodoInput } from 'domains/todo/data/types';

export const deleteTodoValidation = (
  input: DeleteTodoInput,
): [DeleteTodoInput, ValidationError<DeleteTodoInput>] =>
  validate<any>(input, {
    id: [required(), isString()],
  });
