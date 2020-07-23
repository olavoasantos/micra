import { FindTodoInput, FindTodoDTO } from 'domains/todo/data/types';

export const findTodoDTO = (input: FindTodoInput): FindTodoDTO => ({
  id: input.id,
  name: input.name,
  complete: input.complete,
});
