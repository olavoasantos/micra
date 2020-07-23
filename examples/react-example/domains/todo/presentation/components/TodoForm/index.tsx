import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { TodoFormProps } from 'domains/todo/presentation/types';

const TodoForm = ({ todo, onChange, onSubmit }: TodoFormProps) => {
  const { t } = useTranslation();

  return (
    <form data-testid={`todo-form`} onSubmit={onSubmit}>
      <label htmlFor="todo-name">
        {t('todos.name')} <span style={{ color: 'red' }}>*</span>
      </label>
      <input
        type="text"
        id="todo-name"
        name="name"
        value={todo.name}
        onChange={onChange}
        required
      />
      <button type="submit">{t('todos.actions.create')}</button>
    </form>
  );
};

export default memo(TodoForm);
