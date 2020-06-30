import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { state, computed, mutator } from '@micra/store-hooks';
import { createStoreHook } from '../createStoreHook';

describe('create store hook tests', () => {
  interface Todo {
    id: number;
    done: boolean;
  }

  it('uses the store with no args', async () => {
    const todos = state<Todo[]>([{ id: 1, done: false }]);
    const useTodos = createStoreHook(todos);

    const Todos = () => {
      const [list] = useTodos();
      useEffect(() => {
        todos.value = todos.value.concat([{ id: 2, done: true }]);
      }, []);

      return (
        <ul>
          {list.map((todo) => (
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
    const useTodos = createStoreHook(todos);
    const addTodo = mutator(todos, (list, todo: Todo) => list.concat([todo]));

    const Todos = () => {
      const [list] = useTodos();
      useEffect(() => {
        addTodo({ id: 2, done: true });
      }, []);

      return (
        <ul>
          {list.map((todo) => (
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
});
