import { fetchAllTodos } from 'domains/todo/presentation/connectors/fetchAllTodos';
import { markAsIncomplete } from 'domains/todo/presentation/connectors/markAsIncomplete';
import {
  IncompleteTodoProps,
  TodoProps,
} from 'domains/todo/presentation/types';

export const useIncompleteTodo = ({ todo }: TodoProps): IncompleteTodoProps => {
  const [onClick] = markAsIncomplete.lazy({
    ref: todo.id,
    payload: todo,
    onSuccess: () => fetchAllTodos.invalidate(),
  });

  return {
    onClick,
    todo,
  };
};
