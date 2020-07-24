import { useCallback } from 'react';
import { useStoreValue } from '@micra/react-store-hooks';
import { setTodoForm } from 'domains/todo/data';
import { TodoFormProps } from 'domains/todo/presentation/types';
import { createTodo } from 'domains/todo/presentation/connectors/createTodo';
import { fetchAllTodos } from 'domains/todo/presentation/connectors/fetchAllTodos';

export const useTodoForm = (): TodoFormProps => {
  const todo = useStoreValue(use('TodoForm'));
  const [create, { isLoading, error }] = createTodo.lazy({
    payload: todo,
    onSuccess() {
      use('TodoForm').reset();
      fetchAllTodos.invalidate();
    },
  });

  const onChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (target.name === 'name') {
        setTodoForm(target.name, target.value);
      }
    },
    [],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      create();
    },
    [createTodo],
  );

  return {
    error,
    onChange,
    onSubmit,
    todo,
    loading: isLoading,
  };
};
