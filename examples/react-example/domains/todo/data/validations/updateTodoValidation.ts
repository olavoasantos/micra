import { validate, ValidationError } from '@micra/validator';
import {
  required,
  isString,
  optional,
  isBoolean,
} from '@micra/validation-rules';
import { UpdateTodoInput, UpdateTodoDTO } from 'domains/todo/data/types';

export const updateTodoValidation = (
  input: UpdateTodoInput,
): [UpdateTodoDTO, ValidationError<UpdateTodoDTO>] =>
  validate<any>(input, {
    id: [required(), isString()],
    name: optional([isString()]),
    complete: optional([isBoolean()]),
  });
