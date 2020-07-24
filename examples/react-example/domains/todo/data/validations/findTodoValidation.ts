import { validate, ValidationError } from '@micra/validator';
import {
  required,
  isString,
  isBoolean,
  optional,
} from '@micra/validation-rules';
import { FindTodoInput, FindTodoDTO } from 'domains/todo/data/types';

export const findTodoValidation = (
  input: FindTodoInput,
): [FindTodoDTO, ValidationError<FindTodoDTO>] =>
  validate<any>(input, {
    id: [required(), isString()],
    name: optional([isString()]),
    complete: optional([isBoolean()]),
  });
