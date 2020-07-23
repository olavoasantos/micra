import { UpdateTodoInput, UpdateTodoDTO } from 'domains/todo/data/types';

export const updateTodoDTO = (input: UpdateTodoInput): UpdateTodoDTO => ({
  id: input.id,
  name: input.name,
  complete: input.complete,
});
