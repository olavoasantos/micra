import { inject, singleton } from '@micra/tsyringe-service-container';
import { Todo } from 'domains/todo/types';
import { findTodoDTO } from 'domains/todo/data/dtos/findTodoDTO';
import { createTodoDTO } from 'domains/todo/data/dtos/createTodoDTO';
import { updateTodoDTO } from 'domains/todo/data/dtos/updateTodoDTO';
import { deleteTodoDTO } from 'domains/todo/data/dtos/deleteTodoDTO';
import { completeTodoDTO } from 'domains/todo/data/dtos/completeTodoDTO';
import { incompleteTodoDTO } from 'domains/todo/data/dtos/incompleteTodoDTO';
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
    const [data, errors] = createTodoValidation(input);

    if (errors.hasAny()) throw errors;

    const dto = createTodoDTO(data);

    return await this.repository.create(dto);
  }

  async find(input: FindTodoByIdInput): Promise<Todo | undefined> {
    const [data, errors] = findTodoValidation(input);

    if (errors.hasAny()) throw errors;

    const dto = findTodoDTO(data);

    return await this.repository.find(dto);
  }

  async getComplete(): Promise<Todo[]> {
    const dto = findTodoDTO({ complete: true });

    return await this.repository.all(dto);
  }

  async getIncomplete(): Promise<Todo[]> {
    const dto = findTodoDTO({ complete: false });

    return await this.repository.all(dto);
  }

  async update(input: UpdateTodoInput): Promise<Todo> {
    const [data, errors] = updateTodoValidation(input);

    if (errors.hasAny()) throw errors;

    const dto = updateTodoDTO(data);

    return await this.repository.update(dto);
  }

  async markAsComplete(input: CompleteTodoInput): Promise<Todo> {
    const [data, errors] = completeTodoValidation(input);

    if (errors.hasAny()) throw errors;

    const dto = completeTodoDTO(data);

    return await this.repository.update(dto);
  }

  async markAsIncomplete(input: CompleteTodoInput): Promise<Todo> {
    const [data, errors] = completeTodoValidation(input);

    if (errors.hasAny()) throw errors;

    const dto = incompleteTodoDTO(data);

    return await this.repository.update(dto);
  }

  async delete(input: DeleteTodoInput): Promise<Todo> {
    const [data, errors] = deleteTodoValidation(input);

    if (errors.hasAny()) throw errors;

    const dto = deleteTodoDTO(data);

    return await this.repository.delete(dto);
  }
}
