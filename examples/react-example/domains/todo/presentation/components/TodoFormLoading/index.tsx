import React, { memo } from 'react';
import { TodoFormProps } from 'domains/todo/presentation/types';

const TodoFormError = (_props: TodoFormProps) => (
  <div>
    <h2>Loading...</h2>
  </div>
);

export default memo(TodoFormError);
