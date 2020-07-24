import { validate, ValidationError } from '@micra/validator';
import { required, isString } from '@micra/validation-rules';
import { CreateTodoInput, CreateTodoDTO } from 'domains/todo/data/types';

export const createTodoValidation = (
  input: CreateTodoInput,
): [CreateTodoDTO, ValidationError<CreateTodoDTO>] =>
  validate<CreateTodoDTO>(input, {
    name: [required(), isString()],
  });
