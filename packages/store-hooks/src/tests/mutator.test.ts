import { factory } from 'node-factory';
import { state } from '../state';
import { mutator } from '../mutator';

describe('mutator tests', () => {
  it('should mutate a given state', () => {
    const counter = state(0);
    const increment = mutator(counter, (count, by: number = 1) => count + by);

    expect(counter.value).toBe(0);

    increment();
    expect(counter.value).toBe(1);

    increment(2);
    expect(counter.value).toBe(3);
  });

  it('should allow you to use flux-like pattern', () => {
    interface Todo {
      id: string;
      task: string;
      complete: boolean;
    }
    interface TodoState {
      list: Todo[];
      isLoading: boolean;
      error?: string;
    }
    type TodoActions = 'ADD_TODO' | 'SET_IS_LOADING' | 'SET_ERROR' | 'RESET';

    const initialState: TodoState = {
      list: [],
      isLoading: false,
      error: undefined,
    };

    const TodoFactory = factory<Todo>((fake) => ({
      id: fake.random.uuid(),
      task: fake.lorem.sentence(),
      complete: fake.random.boolean(),
    }));

    const todo = TodoFactory.make();

    const todos = state<TodoState>(initialState);
    const dispatch = mutator(
      todos,
      (state: TodoState, type: TodoActions, payload?: Todo | boolean | Error) => {
        switch (type) {
          case 'ADD_TODO':
            return {
              list: state.list.concat([payload as Todo]),
            };
          case 'SET_IS_LOADING':
            return {
              isLoading: payload as boolean,
            };
          case 'SET_ERROR':
            return {
              error: (payload as Error).message,
            };
          case 'RESET':
            return todos.reset();
          default:
            return state;
        }
      },
    );

    dispatch('SET_IS_LOADING', true);
    expect(todos.value).toMatchObject({
      list: [],
      isLoading: true,
      error: undefined,
    });

    dispatch('ADD_TODO', todo);
    expect(todos.value).toMatchObject({
      list: [todo],
      isLoading: true,
      error: undefined,
    });

    dispatch('SET_ERROR', new Error('Whoops!'));
    expect(todos.value).toMatchObject({
      list: [todo],
      isLoading: true,
      error: 'Whoops!',
    });

    dispatch('RESET');
    expect(todos.value).toMatchObject({
      list: [],
      isLoading: false,
      error: undefined,
    });
  });
});
