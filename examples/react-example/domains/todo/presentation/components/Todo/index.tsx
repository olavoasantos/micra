import React, { memo } from 'react';
import { TodoProps } from 'domains/todo/presentation/types';

const Todo = ({ todo }: TodoProps) => (
  <div
    data-testid={`todo-${todo.id}`}
    style={{ textDecoration: todo.complete ? 'line-through' : undefined }}
  >
    {todo.name}
  </div>
);

export default memo(Todo);
