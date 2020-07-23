import { validate, ValidationError } from '@micra/validator';
import { required, isString } from '@micra/validation-rules';
import { CreateTodoInput } from 'domains/todo/data/types';

export const createTodoValidation = (
  input: CreateTodoInput,
): [CreateTodoInput, ValidationError<CreateTodoInput>] =>
  validate<CreateTodoInput>(input, {
    name: [required(), isString()],
  });
