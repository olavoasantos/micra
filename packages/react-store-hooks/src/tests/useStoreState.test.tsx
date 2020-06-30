import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { state, computed, mutator } from '@micra/store-hooks';
import { useStoreState } from '../useStoreState';

describe('useStoreState hook tests', () => {
  interface Todo {
    id: number;
    done: boolean;
  }

  it('uses the store with no args', async () => {
    const todos = state<Todo[]>([{ id: 1, done: false }]);

    const Todos = () => {
      const { data } = useStoreState(todos);

      useEffect(() => {
        todos.value = todos.value.concat([{ id: 2, done: true }]);
      }, []);

      return (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>
              todo #{todo.id} ({todo.done ? 'done' : 'not done'})
            </li>
          ))}
        </ul>
      );
    };

    const { getByText } = render(<Todos />);

    getByText('todo #1 (not done)');
    getByText('todo #2 (done)');
  });

  it('uses update with mutators', async () => {
    const todos = state<Todo[]>([{ id: 1, done: false }]);
    const addTodo = mutator(todos, (list, todo: Todo) => list.concat([todo]));

    const Todos = () => {
      const { data } = useStoreState(todos);

      useEffect(() => {
        addTodo({ id: 2, done: true });
      }, []);

      return (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>
              todo #{todo.id} ({todo.done ? 'done' : 'not done'})
            </li>
          ))}
        </ul>
      );
    };

    const { getByText } = render(<Todos />);

    getByText('todo #1 (not done)');
    getByText('todo #2 (done)');
  });

  it('uses accept computed states', async () => {
    const todos = state<Todo[]>([{ id: 1, done: false }]);
    const completeTodos = computed(todos, (list) => list.filter((todo) => todo.done));
    const addTodo = mutator(todos, (list, todo: Todo) => list.concat([todo]));

    const Todos = () => {
      const { data } = useStoreState(completeTodos);

      useEffect(() => {
        addTodo({ id: 2, done: true });
      }, []);

      return (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>
              todo #{todo.id} ({todo.done ? 'done' : 'not done'})
            </li>
          ))}
        </ul>
      );
    };

    const { getByText } = render(<Todos />);

    getByText('todo #2 (done)');
  });
});
