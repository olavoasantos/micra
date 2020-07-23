import { useCallback } from 'react';
import { useQuery, queryCache } from 'react-query';
import { useStoreValue } from '@micra/react-store-hooks';
import { TodoService } from 'domains/todo/data/types';
import { setTodoForm } from 'domains/todo/data';
import { TodoFormProps } from 'domains/todo/presentation/types';

export const useTodoForm = (): TodoFormProps => {
  const todo = useStoreValue(use('TodoForm'));
  const { refetch: createTodo, isLoading, error } = useQuery(
    'create-todo',
    () => use<TodoService>('TodoService').create(todo),
    {
      enabled: false,
      onSuccess() {
        use('TodoForm').reset();
        queryCache.invalidateQueries('todo-list');
      },
    },
  );

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
      createTodo();
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
