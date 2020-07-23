import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { TodoListProps } from 'domains/todo/presentation/types';
import Todo from 'domains/todo/presentation/components/Todo';
import DeleteTodo from 'domains/todo/presentation/features/DeleteTodo';
import CompleteTodo from 'domains/todo/presentation/features/CompleteTodo';
import IncompleteTodo from 'domains/todo/presentation/features/IncompleteTodo';

const TodoList = ({ todos }: TodoListProps) => {
  const { t } = useTranslation();

  return (
    <ul data-testid={`todo-list`}>
      {todos.map((todo) => (
        <li key={todo.id} style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Todo todo={todo} />
          </div>
          {todo.complete ? (
            <IncompleteTodo todo={todo} />
          ) : (
            <CompleteTodo todo={todo} />
          )}
          <DeleteTodo todo={todo} />
        </li>
      ))}
    </ul>
  );
};

export default memo(TodoList);
