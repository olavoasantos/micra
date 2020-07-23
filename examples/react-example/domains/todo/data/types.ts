import { Todo } from 'domains/todo/types';

export interface CreateTodoInput {
  name: string;
}

export interface FindTodoByIdInput {
  id: string;
}

export interface FindTodoInput {
  id?: string;
  name?: string;
  complete?: boolean;
}

export interface UpdateTodoInput {
  id: string;
  name?: string;
  complete?: boolean;
}

export interface CompleteTodoInput {
  id: string;
}

export interface DeleteTodoInput {
  id: string;
}

export interface CreateTodoDTO {
  name: string;
}

export interface FindTodoDTO {
  id?: string;
  name?: string;
  complete?: boolean;
}

export interface UpdateTodoDTO {
  id: string;
  name?: string;
  complete?: boolean;
}

export interface DeleteTodoDTO {
  id: string;
}

export interface TodoRepository {
  all(dto?: FindTodoDTO): Promise<Todo[]>;
  create(dto: CreateTodoDTO): Promise<Todo>;
  find(dto: FindTodoDTO): Promise<Todo | undefined>;
  update(dto: UpdateTodoDTO): Promise<Todo>;
  delete(dto: DeleteTodoDTO): Promise<Todo>;
}

export interface TodoService {
  all(): Promise<Todo[]>;
  create(input: CreateTodoInput): Promise<Todo>;
  find(input: FindTodoByIdInput): Promise<Todo | undefined>;
  getComplete(): Promise<Todo[]>;
  getIncomplete(): Promise<Todo[]>;
  update(input: UpdateTodoInput): Promise<Todo>;
  markAsComplete(input: CompleteTodoInput): Promise<Todo>;
  markAsIncomplete(input: CompleteTodoInput): Promise<Todo>;
  delete(input: DeleteTodoInput): Promise<Todo>;
}

export interface TodoDataSource {
  all(dto?: FindTodoDTO): Promise<Todo[]>;
  create(dto: CreateTodoDTO): Promise<Todo>;
  find(dto: FindTodoDTO): Promise<Todo | undefined>;
  update(dto: UpdateTodoDTO): Promise<Todo>;
  delete(dto: DeleteTodoDTO): Promise<Todo>;
}
