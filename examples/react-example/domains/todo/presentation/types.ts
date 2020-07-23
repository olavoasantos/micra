import { Todo } from 'domains/todo/types';
import { CreateTodoInput } from 'domains/todo/data/types';

export interface TodoListProps {
  error: Error | null;
  loading: boolean;
  todos: Todo[];
}

export interface TodoFormProps {
  error: Error | null;
  loading: boolean;
  todo: CreateTodoInput;
  onChange(e: React.ChangeEvent): void;
  onSubmit(e: React.FormEvent): void;
}

export interface TodoProps {
  todo: Todo;
}

export interface DeleteTodoProps {
  todo: Todo;
  onClick: () => void;
}

export interface CompleteTodoProps {
  todo: Todo;
  onClick: () => void;
}

export interface IncompleteTodoProps {
  todo: Todo;
  onClick: () => void;
}
