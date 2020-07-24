import { DeleteTodoProps, TodoProps } from 'domains/todo/presentation/types';
import { deleteTodo } from 'domains/todo/presentation/connectors/deleteTodo';
import { fetchAllTodos } from 'domains/todo/presentation/connectors/fetchAllTodos';

export const useDeleteTodo = ({ todo }: TodoProps): DeleteTodoProps => {
  const [onClick] = deleteTodo.lazy({
    ref: todo.id,
    payload: todo,
    onSuccess: () => fetchAllTodos.invalidate(),
  });

  return {
    onClick,
    todo,
  };
};
