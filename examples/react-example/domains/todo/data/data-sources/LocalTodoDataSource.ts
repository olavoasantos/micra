import { ValueState } from '@micra/store-hooks';
import { Todo } from 'domains/todo/types';
import {
  addTodo,
  deleteTodo,
  updateTodo,
} from 'domains/todo/data/stores/todoStore';
import {
  CreateTodoDTO,
  DeleteTodoDTO,
  FindTodoDTO,
  TodoDataSource,
  UpdateTodoDTO,
} from 'domains/todo/data/types';
import { inject, singleton } from '@micra/tsyringe-service-container';

@singleton()
export class LocalTodoDataSource implements TodoDataSource {
  protected store: ValueState<Todo[]>;

  constructor(@inject('TodoStore') todoStore: ValueState<Todo[]>) {
    this.store = todoStore;
  }

  async all(dto?: FindTodoDTO): Promise<Todo[]> {
    if (dto) {
      return this.store.value.filter(
        (todo) =>
          (dto.id && todo.id === dto.id) ||
          (dto.name && todo.name === dto.name) ||
          (dto.complete && todo.complete === dto.complete),
      );
    }

    return this.store.value.slice();
  }

  async create(dto: CreateTodoDTO): Promise<Todo> {
    const todo = {
      id: '123',
      complete: false,
      name: dto.name,
    };

    addTodo(todo);

    return todo;
  }

  async find(dto: FindTodoDTO): Promise<Todo | undefined> {
    return this.store.value.find(
      (todo) =>
        (dto.id && todo.id === dto.id) ||
        (dto.name && todo.name === dto.name) ||
        (dto.complete && todo.complete === dto.complete),
    );
  }

  async update(dto: UpdateTodoDTO): Promise<Todo> {
    const todo = await this.find(dto);

    if (!todo) throw new Error('Todo not found');

    updateTodo(dto);

    return todo;
  }

  async delete(dto: DeleteTodoDTO): Promise<Todo> {
    const todo = await this.find(dto);

    if (!todo) throw new Error('Todo not found');

    deleteTodo(dto);

    return todo;
  }
}
