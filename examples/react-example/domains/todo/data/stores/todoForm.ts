import { state, mutator } from '@micra/store-hooks';
import { CreateTodoInput } from 'domains/todo/data/types';

export const todoForm = state<CreateTodoInput>({ name: '' });
export const setTodoForm = mutator(
  todoForm,
  (_, key: keyof CreateTodoInput, value: string) => ({ [key]: value }),
);
