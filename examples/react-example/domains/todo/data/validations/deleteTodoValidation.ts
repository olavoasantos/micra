import { validate, ValidationError } from '@micra/validator';
import { required, isString } from '@micra/validation-rules';
import { DeleteTodoInput, DeleteTodoDTO } from 'domains/todo/data/types';

export const deleteTodoValidation = (
  input: DeleteTodoInput,
): [DeleteTodoDTO, ValidationError<DeleteTodoDTO>] =>
  validate<DeleteTodoDTO>(input, {
    id: [required(), isString()],
  });
