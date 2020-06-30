import { factory } from 'node-factory';
import { state } from '../state';

describe('state tests', () => {
  it('should return an initial value', () => {
    const counter = state(0);

    expect(counter.value).toBe(0);
  });

  it('should return update the state', () => {
    const counter = state(0);

    counter.value = 1;

    expect(counter.value).toBe(1);
  });

  it('should return update the state using set', () => {
    const counter = state(0);

    counter.set(1);

    expect(counter.value).toBe(1);
  });

  it('should return update the state using set with a callback', () => {
    const counter = state(0);

    counter.set((count) => count + 1);

    expect(counter.value).toBe(1);
  });

  it('should return update the state with a partial object', () => {
    const userForm = state({ name: 'John', age: 32 });

    userForm.set({ name: 'John Doe' });

    expect(userForm.value).toMatchObject({ name: 'John Doe', age: 32 });
  });

  it('should reset the store to the initial value', () => {
    const counter = state(0);

    counter.value = 1;
    counter.reset();

    expect(counter.value).toBe(0);
  });

  it('should notify listeners upon change', () => {
    const counter = state(0);
    const listener = jest.fn();

    counter.subscribe(listener);

    counter.value = 1;
    expect(listener).toHaveBeenLastCalledWith(1);

    counter.set(20);
    expect(listener).toHaveBeenLastCalledWith(20);

    counter.set(() => 5);
    expect(listener).toHaveBeenLastCalledWith(5);

    counter.reset();
    expect(listener).toHaveBeenLastCalledWith(0);
  });

  it('should not notify listeners upon un-subscription', () => {
    const counter = state(0);
    const listener = jest.fn();
    const unsubscribe = counter.subscribe(listener);

    counter.value = 1;
    expect(listener).toHaveBeenLastCalledWith(1);

    unsubscribe();

    counter.value = 10;
    expect(listener).not.toHaveBeenLastCalledWith(10);
  });

  it('should validate the state before committing', () => {
    const counter = state(0, (_, update) => update >= 0);

    counter.value = 1;
    expect(counter.value).toBe(1);

    counter.value = -1;
    expect(counter.value).toBe(1);
  });

  it('should validate an array state before committing', () => {
    interface Todo {
      name: string;
    }
    const list = state<Todo[]>([], (_, update) => {
      const entry = update.pop();

      if (!entry?.name) {
        return false;
      }

      update.push(entry);
      return true;
    });

    list.value = list.value.concat([{ name: '1' }]);
    expect(list.value).toMatchObject([{ name: '1' }]);

    list.value = list.value.concat([{} as any]);
    expect(list.value).toMatchObject([{ name: '1' }]);
  });

  it('should validate an object state before committing', () => {
    interface Todo {
      name: string;
      id: string;
    }
    const form = state<Todo>({ name: '', id: '' }, (_, update) => {
      const fields = Object.keys(update);

      if ((fields.includes('id') && !update.id) || (fields.includes('name') && !update.name))
        return false;

      return true;
    });

    form.set({ name: 'John' });
    expect(form.value).toMatchObject({ name: 'John' });

    form.set({ name: '' });
    expect(form.value).toMatchObject({ name: 'John' });

    form.reset();
    expect(form.value).toMatchObject({ name: '' });
  });

  it('should listen to async events', async () => {
    interface Todo {
      id: string;
      task: string;
      complete: boolean;
    }
    const TodoFactory = factory<Todo>((fake) => ({
      id: fake.random.uuid(),
      task: fake.lorem.sentence(),
      complete: fake.random.boolean(),
    }));

    const list = state<Todo[]>([]);
    const addTodo = (todo: Todo) => list.set((todos) => todos.concat([todo]));

    const fetchTodo = (data: Partial<Todo>) =>
      new Promise<Todo>((res) => {
        return res(TodoFactory.make(data));
      });
    const fetchTodoById = async (id: string) => {
      const todo = await fetchTodo({ id });

      addTodo(todo);
    };

    expect(list.value).toHaveLength(0);
    await fetchTodoById('123');
    expect(list.value).toHaveLength(1);
    expect(list.value[0].id).toBe('123');
  });

  describe('lifecyle tests', () => {
    function wait() {
      return new Promise((resolve) => setImmediate(resolve));
    }

    it('should call the flush lifecyle', async () => {
      const counter = state(0);
      const spy = jest.fn();

      counter.on('flush', spy);

      counter.flush();

      await wait();

      expect(spy).toHaveBeenCalled();
    });

    it('should call the cancel and update lifecyles', async () => {
      const event = state(-1);

      const onUpdateSpy = jest.fn();
      const onCancelSpy = jest.fn();
      const shouldBeReachedOnce = jest.fn();
      const cancelEvent = (i?: number) => (i === 0 ? event.set(1) : undefined);

      event.subscribe(cancelEvent);
      event.subscribe(shouldBeReachedOnce);

      event.on('cancel', onCancelSpy);
      event.on('update', onUpdateSpy);

      event.set(0);

      await wait();

      expect(onCancelSpy).toHaveBeenCalledTimes(1);
      expect(onCancelSpy).toHaveBeenCalledWith(-1, 0);
      expect(onUpdateSpy).toHaveBeenCalledTimes(1);
      expect(onUpdateSpy).toHaveBeenCalledWith(-1, 1);
    });
  });
});
