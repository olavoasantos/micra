import { Todo } from 'domains/todo/types';
import { TodoService } from 'domains/todo/data/types';
import { createAction } from 'helpers/createAction';

export const deleteTodo = createAction<Todo, Todo>('delete-todo', (todo) =>
  use<TodoService>('TodoService').delete(todo as Todo),
);
