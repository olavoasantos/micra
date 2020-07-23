import { inject, singleton } from '@micra/tsyringe-service-container';
import { Todo } from 'domains/todo/types';
import {
  CreateTodoDTO,
  DeleteTodoDTO,
  FindTodoDTO,
  TodoDataSource,
  TodoRepository,
  UpdateTodoDTO,
} from 'domains/todo/data/types';

@singleton()
export class TodoClientRepository implements TodoRepository {
  protected localDataSource: TodoDataSource;

  constructor(@inject('LocalTodoDataSource') localDataSource: TodoDataSource) {
    this.localDataSource = localDataSource;
  }

  async all(dto?: FindTodoDTO): Promise<Todo[]> {
    return await this.localDataSource.all(dto);
  }

  async create(dto: CreateTodoDTO): Promise<Todo> {
    return await this.localDataSource.create(dto);
  }

  async find(dto: FindTodoDTO): Promise<Todo | undefined> {
    return await this.localDataSource.find(dto);
  }

  async update(dto: UpdateTodoDTO): Promise<Todo> {
    return await this.localDataSource.update(dto);
  }

  async delete(dto: DeleteTodoDTO): Promise<Todo> {
    return await this.localDataSource.delete(dto);
  }
}
