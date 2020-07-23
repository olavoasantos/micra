import React, { memo } from 'react';
import { TodoFormProps } from 'domains/todo/presentation/types';

const TodoFormError = ({ error }: TodoFormProps) => (
  <div>
    <h2>Something went wrong...</h2>
    {error?.message}
  </div>
);

export default memo(TodoFormError);
