import { factory } from 'node-factory';
import { Todo } from 'domains/todo/types';

export const TodoFactory = factory<Todo>((fake) => ({
  id: fake.random.uuid(),
  name: fake.lorem.sentence(),
  complete: fake.random.boolean(),
}));
