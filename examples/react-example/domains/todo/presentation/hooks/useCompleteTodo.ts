import { CompleteTodoProps, TodoProps } from 'domains/todo/presentation/types';
import { fetchAllTodos } from 'domains/todo/presentation/connectors/fetchAllTodos';
import { markAsComplete } from 'domains/todo/presentation/connectors/markAsComplete';

export const useCompleteTodo = ({ todo }: TodoProps): CompleteTodoProps => {
  const [onClick] = markAsComplete.lazy({
    ref: todo.id,
    payload: todo,
    onSuccess: () => fetchAllTodos.invalidate(),
  });

  return {
    onClick,
    todo,
  };
};
