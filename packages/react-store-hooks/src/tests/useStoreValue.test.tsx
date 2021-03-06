import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { state, computed, mutator } from '@micra/store-hooks';
import { useStoreValue } from '../useStoreValue';

describe('useStoreValue hook tests', () => {
  interface Todo {
    id: number;
    done: boolean;
  }

  it('updates by assigning the value', async () => {
    const todos = state<Todo[]>([{ id: 1, done: false }]);

    const Todos = () => {
      const list = useStoreValue(todos);

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

  it('updates using the set method', async () => {
    const todos = state<Todo[]>([{ id: 1, done: false }]);

    const Todos = () => {
      const list = useStoreValue(todos);

      useEffect(() => {
        todos.set((list) => list.concat([{ id: 2, done: true }]));
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

  it('updates using mutators', async () => {
    const todos = state<Todo[]>([{ id: 1, done: false }]);
    const addTodo = mutator(todos, (list, todo: Todo) => list.concat([todo]));

    const Todos = () => {
      const list = useStoreValue(todos);

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
