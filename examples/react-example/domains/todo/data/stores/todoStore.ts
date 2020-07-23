import { state, mutator } from '@micra/store-hooks';
import { Todo } from 'domains/todo/types';
import { UpdateTodoDTO } from 'domains/todo/data/types';

export const todoStore = state<Todo[]>([]);
export const addTodo = mutator(todoStore, (todos, todo: Todo) =>
  todos.concat([todo]),
);
export const updateTodo = mutator(todoStore, (todos, todo: UpdateTodoDTO) =>
  todos.map((data) => (data.id === todo.id ? { ...data, ...todo } : data)),
);
export const deleteTodo = mutator(todoStore, (todos, todo: UpdateTodoDTO) =>
  todos.filter((data) => data.id !== todo.id),
);
export const completeTodo = mutator(todoStore, (todos, todo: UpdateTodoDTO) =>
  todos.map((data) =>
    data.id === todo.id ? { ...data, complete: true } : data,
  ),
);
