import { inject, singleton } from '@micra/tsyringe-service-container';
import { Todo } from 'domains/todo/types';
import { findTodoValidation } from 'domains/todo/data/validations/findTodoValidation';
import { createTodoValidation } from 'domains/todo/data/validations/createTodoValidation';
import { updateTodoValidation } from 'domains/todo/data/validations/updateTodoValidation';
import { deleteTodoValidation } from 'domains/todo/data/validations/deleteTodoValidation';
import { completeTodoValidation } from 'domains/todo/data/validations/completeTodoValidation';
import {
  TodoService,
  CreateTodoInput,
  TodoRepository,
  FindTodoByIdInput,
  CompleteTodoInput,
  DeleteTodoInput,
  UpdateTodoInput,
} from 'domains/todo/data/types';
import { incompleteTodoValidation } from './validations/incompleteTodoValidation';

@singleton()
export class TodoClientService implements TodoService {
  protected repository: TodoRepository;

  constructor(@inject('TodoRepository') repository: TodoRepository) {
    this.repository = repository;
  }

  async all(): Promise<Todo[]> {
    return await this.repository.all();
  }

  async create(input: CreateTodoInput): Promise<Todo> {
    const [dto, errors] = createTodoValidation(input);

    if (errors.hasAny()) throw errors;

    return await this.repository.create(dto);
  }

  async find(input: FindTodoByIdInput): Promise<Todo | undefined> {
    const [dto, errors] = findTodoValidation(input);

    if (errors.hasAny()) throw errors;

    return await this.repository.find(dto);
  }

  async getComplete(): Promise<Todo[]> {
    const [dto, errors] = findTodoValidation({ complete: true });

    if (errors.hasAny()) throw errors;

    return await this.repository.all(dto);
  }

  async getIncomplete(): Promise<Todo[]> {
    const [dto, errors] = findTodoValidation({ complete: false });

    if (errors.hasAny()) throw errors;

    return await this.repository.all(dto);
  }

  async update(input: UpdateTodoInput): Promise<Todo> {
    const [dto, errors] = updateTodoValidation(input);

    if (errors.hasAny()) throw errors;

    return await this.repository.update(dto);
  }

  async markAsComplete(input: CompleteTodoInput): Promise<Todo> {
    const [dto, errors] = completeTodoValidation(input);

    if (errors.hasAny()) throw errors;

    return await this.repository.update(dto);
  }

  async markAsIncomplete(input: CompleteTodoInput): Promise<Todo> {
    const [dto, errors] = incompleteTodoValidation(input);

    if (errors.hasAny()) throw errors;

    return await this.repository.update(dto);
  }

  async delete(input: DeleteTodoInput): Promise<Todo> {
    const [dto, errors] = deleteTodoValidation(input);

    if (errors.hasAny()) throw errors;

    return await this.repository.delete(dto);
  }
}
