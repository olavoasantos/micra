import { CreateTodoInput, CreateTodoDTO } from 'domains/todo/data/types';

export const createTodoDTO = (input: CreateTodoInput): CreateTodoDTO => ({
  name: input.name,
});
