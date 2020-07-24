import { Todo } from 'domains/todo/types';
import { TodoService } from 'domains/todo/data/types';
import { createAction } from 'helpers/createAction';

export const createTodo = createAction<Todo>('create-todo', (todo: Todo) =>
  use<TodoService>('TodoService').create(todo),
);
