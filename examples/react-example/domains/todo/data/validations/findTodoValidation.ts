import { validate, ValidationError } from '@micra/validator';
import { required, isString } from '@micra/validation-rules';
import { FindTodoInput, FindTodoByIdInput } from 'domains/todo/data/types';

export const findTodoValidation = (
  input: FindTodoByIdInput,
): [FindTodoInput, ValidationError<FindTodoInput>] =>
  validate<any>(input, {
    id: [required(), isString()],
  });
