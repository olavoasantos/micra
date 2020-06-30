# @micra/store-hooks

## Installation

```sh
yarn add @micra/store-hooks
```

## Basic usage

```typescript
import { state } from "@micra/store-hooks";

const counter = state<number>(10);
const double = computed(counter, (count) => count * 2);
const increment = mutator(counter, (count, by: number = 1) => count + by);
const decrement = mutator(counter, (count, by: number = 1) => count - by);

counter.value; // 10
double.value;  // 20
increment(10); // counter.value = 20 / double.value = 40
decrement(20); // counter.value =  0 / double.value =  0
```

## Using a framework

### React

See [@micra/react-store-hooks](https://www.npmjs.com/package/@micra/react-store-hooks):

```tsx
import React from 'react';
import { state } from '@micra/store-hooks';
import { useStore } from '@micra/react-store-hooks';

const counter = state(0);

const Counter = () => {
  const [count, setCount] = useStore(counter);

  return (
    <div>
      <h1>Count is {count}</h1>
      <button onClick={() => setCount(count + 1)}>increment</button>
      <button onClick={() => setCount(count - 1)}>decrement</button>
    </div>
  );
};
```

### Vue

See [@micra/vue-store-hooks](https://www.npmjs.com/package/@micra/vue-store-hooks):

```html
<template>
  <div id="app">
    <h1>Count is {{ count }}</h1>
    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
  </div>
</template>

<script>
import { useStore } from "@micra/vue-store-hooks";
import { state } from "@micra/store-hooks";

export const counter = state(0);

export default {
  setup() {
    const [count, setCount] = useStore(counter);

    return {
      count,
      increment: () => setCount(count => count + 1),
      decrement: () => setCount(count => count - 1)
    };
  }
};
</script>
```

> Note: `@micra/vue-store-hooks` uses [Vue's composition API](https://composition-api.vuejs.org/) which is still in beta.

### Alpine

See [@micra/alpine-store-hooks](https://www.npmjs.com/package/@micra/alpine-store-hooks):

```typescript
import 'alpinejs';
import { initStores } from '@micra/alpine-store-hooks';

const count = state(0);
const increment = mutator(counter, (count, by: number = 1) => count + by);
const decrement = mutator(counter, (count, by: number = 1) => count - by);

window.$stores = initStores({
  counter: {
    count,
    increment,
    decrement
  }
});
```

```html
<div
  x-data="{ increment: $stores.counter.increment, decrement: $stores.counter.decrement }"
  x-store="counter.count"
>
  <h1>Count is <span x-text="$count"></span></h1>
  <button @click="increment">increment</button>
  <button @click="decrement">decrement</button>
</div>
```

### Svelte

```html
<script>
  import { state, mutator } from "@micra/store-hooks";

  const counter = state(0);
  const increment = mutator(counter, count => count + 1);
  const decrement = mutator(counter, count => count + 1);
</script>

<h1>Count is {$counter || counter.value}</h1>
<button on:click={increment}>increment</button>
<button on:click={decrement}>decrement</button>
```

## Devtools

The store hooks can be hooked up to Redux Devtools!

See [@micra/store-hooks-devtools](https://www.npmjs.com/package/@micra/store-hooks-devtools):

```typescript
import { state } from '@micra/store-hooks';
import { devtools } from '@micra/store-hooks-devtools';

export const counter = state<number>(0);

devtools({
  counter,
  // ... other states
});
```

## Hooks

### state

The state hook is the heart of the store hooks! It sets the foundation for all the other rest of the lib to work. This hooks observes a given value and sends updates to subscribers whenever the value is updated. This can store any value `T` you want.

#### Defining state

```typescript
import { state } from "@micra/store-hooks";

// Simple value
export const counter = state<number>(0);

// Object
export interface LoginForm { email: string; password: string }
export const loginForm = state<LoginForm>({
  email: '',
  password: '',
});

// Array
export interface Todo { task: string; complete: boolean }
export const todoList = state<Todo[]>([
  { task: 'Write documentation', complete: false },
]);
```

#### Reading state

To read the value of the state, you can read the `value` param. So, based on the examples above:

```typescript
import { counter, loginForm, todoList } from "./states";

counter.value // 0
loginForm.value // { email: '', password: '' }
todoList.value // [ { task: 'Write documentation', complete: false } ]
```

#### Updating state

There are four ways to update a given state:

1. Setting the value
2. Using set with a value
3. Using set with a callback
4. Using a mutator (see section below)

**1. Setting the value**

The quickest way to update a state is to simply assign a new value to the `value` param:

```typescript
import { counter, loginForm, todoList } from "./states";

counter.value = 42;

loginForm.value = { email: 'john@example.com', password: 'P@s5W0rD' }

todoList.value = [
  { task: 'Fix bugs', complete: false }
];
```

This will then synchronize the update with the subscribers.

It's worth noting that for state values which are reference types (e.g. objects and arrays), mutating the object will not trigger syncs. This means that:

```typescript
// BAD! Won't sync
todoList.value.push({ task: 'Respond to issues', complete: false });

// Good! Will sync
todoList.value = todoList.value.concat({ task: 'Respond to issues', complete: false });
```

**2. Using set with a value**

Another way to update the state is by using the `set` method. This method allows you to call it in two different ways:

- passing the new value as argument
- passing a callback that returns the new value (see number 3 below)

For simple cases, passing the value is a great option:

```typescript
import { counter } from "./states";

counter.set(12);
```

When you're dealing with objects, this strategy is particularly handy as you don't need to pass the full object structure. Internally, the hook will merge it with the current state:

```typescript
import { loginForm } from "./states";

// Update all fields
loginForm.set({ email: 'jane@example.com', password: 'My_P@s5W0rD' });

// Update only password... not very safely
loginForm.set({ password: '1234567890a' });
```

**3. Using set with a callback**

As we saw above, the `set` method also accepts a callback function. This function receives the current state as argument and should return the new state or, if you're handling an object, a partial version of the state:

```typescript
import { counter, loginForm, todoList } from "./states";

counter.set((count) => count * 2));

loginForm.set((data) => { email: data.email, password: '1234567890a' });

todoList.set((list) => list.concat([{ task: 'Publish next version', complete: false }]));
```

**4. Using a mutator (see section below)**

This method will have it's own little section below. I think you'll like it. =)

#### Validating state

Every once and a while, there are some states that have some limitations. For instance, a counter that can't have negative values or a form field that can't be empty. For cases like these, we can pass a validator function as the second parameter of the state hook. This function takes the shape of:

```typescript
(currentState: T, updates: U) => boolean;
```

If the return is `true`, then it will run the update. If `false`, the update will be blocked.

Let's see some examples:

```typescript
import { state } from "@micra/store-hooks";

// A counter that can't have negative values
export const counter = state<number>(0, (_, newCount) => newCount > 0);

// A counter that can't set a value lower than the current
export const counter = state<number>(0, (prevCount, newCount) => newCount > prevCount);

// A login form where e-mail can't be empty
export interface LoginForm { email: string; password: string }
export const loginForm = state<LoginForm>(
  { email: '', password: '' },
  (_, updates) => {
    const fields = Object.keys(updates);

    if (fields.includes('email') && !Boolean(updates.email)) {
      return false;
    }

    return true;
  }
);
```

#### Resetting to the initial state

Sometimes it's useful to reset a given state to it's initial state. For example, say that after submitting a form you need to clear the data or you wish to clear a counter. For that, states have the `reset` method!

```typescript
import { counter, loginForm } from "./states";

// Clearing our counter
counter.reset(); // back to 0!

// Imaginary login form submission
const submitLoginForm = () => {
  const data = loginForm.value;

  // login logic...

  loginForm.reset(); // back to { email: '', password: '' }
}
```

#### Subscribing for changes

To listen to updates on a given state, you can use the `subscribe` method and pass a callback. This function will receive the new state as argument and return an `unsubscribe` function.

```typescript
export interface State<T> {
  // ...
  subscribe<U = T>(
    listener: StateListener<U>,
    selector?: StateSelector<T, U>,
    shouldUpdate?: Compare<U, U>,
  ): () => void;
  // ...
}
```

So, if we want to get notified whenever the counter value changes, then we can do:

```typescript
import { counter } from "./states";

counter.subscribe((count) => {
  console.log(count);
});
```

##### What if I need just part of the state?

Very good question! If you need to modify the state in some way, the subscribe function accepts a second argument. This argument is a callback which will receive the updated state as an argument and should return the transformed value. Let's see a couple of examples:

```typescript
import { counter, loginForm, todoList } from "./states";

/**
 * Getting the double value of the counter
 */
counter.subscribe(
  (double) => {
    console.log(double); // <~~ will receive the double of the current count
  },
  (count) => count * 2,
);

/**
 * Getting only the e-mail from the login form
 */
loginForm.subscribe<string>(
  (email) => {
    console.log(email); // <~~ will be the e-mail
  },
  ({ email }) => email,
);

/**
 * Getting only the completed to-dos from the list
 */
todoList.subscribe(
  (complete) => {
    console.log(complete); // <~~ will contain only the complete to-dos
  },
  (list) => list.filter(todo => todo.complete),
);
```

> If you like this, go take a look at the `computed` hook! I think you're gonna love it ;)

##### Very nice! But, what if I don't want to receive all the updates?

Another very good question! If you're dealing with components, you might not want to receive all the updates to avoid unnecessary re-renders. You can certainly do that by passing a third argument to the subscribe function. This function receives the previous state as the first argument, the updates on the second and should return a boolean. If this function returns `true`, the subscription will be triggered. If `false`, then the updated will be ignored.

```typescript
type Compare<T, U = any> = (prevState: T, update: U) => boolean;
```

Let's see an example:

```typescript
import { loginForm } from "./states";

/**
 * Since we only need the e-mail, we only want to get notified when that changes.
 */
loginForm.subscribe<string>(
  (email) => {
    console.log(email); // <~~ will only be called if there are changes to the e-mail.
  },
  ({ email }) => email,
  (prevState, updates) => prevState.email !== updates.email,
);
```

#### Unsubscribing for changes

After subscribing to a given state, we sometimes need to stop listening to updates. To do that you can simply call the function that's returned by the `subscribe` function. let's see!

```typescript
import { counter } from "./states";

const unsubscribe = counter.subscribe((count) => {
  console.log(count);
});

unsubscribe(); // <~~~~ this will cancel your subscription!
```

#### Clearing all subscription from the state

If you need to unsubscribe all listeners from a state, you can use the the `flush` method. This will make sure the no-one is listening for the next updates.

```typescript
import { counter } from "./states";

counter.flush();
```

#### Lifecycle events

Lifecycle events are asynchronous events emitted by the state. These will be called in the next tick so that observers can get notified when something happens. To listen for these events use the `on` method which accepts a lifecycle event, a listener and returns an unsubscribe function.

#### update

Called when all subscriptions are synced.

```typescript
on(event: 'update', listener: (previousState: T, nextState: T) => void): () => void;
```

#### cancel

Called when an update event is cancelled.

```typescript
on(event: 'cancel', listener: (state: T, cancelledState: T) => void): () => void;
```

#### error

Called when an error occurs while synchronizing a subscription.

```typescript
on(event: 'error', listener: (error: Error, currentState: T, nextState: T) => void): () => void;
```

#### flush

Called when all subscriptions are cleared from the state.

```typescript
on(event: 'flush', listener: (state: T) => void): () => void;
```

#### State object

```typescript
export interface ValueState<T = any> {
  value: T;
  set(partial: Partial<T> | ((state: T) => Partial<T>)): T;
  reset(): T;
  flush(): void;
  on(event: Lifecycle, listener: (...payload?: any[]) => void): void;
  subscribe<U = T>(
    listener: StateListener<U>,
    selector?: StateSelector<T, U>,
    shouldUpdate?: Compare<U, U>,
  ): () => void;
}
```

### computed

When going over the the `state` hook, we talked about how we can use the `subscribe` to transform the current state. While that's very cool, it can get kinda clumsy to keep track of the transformed value. To make this easier and cleaner, we can use the `computed` hook!

This hook receives a state as the first argument, the selector as the second and the should update function as the last (similar to the `subscribe` function).

Let's take that to-do list example:

```typescript
import { state, computed } from "@micra/store-hooks";

// Simple value
export const counter = state<number>(0);
export const double = computed(counter, (count) => count * 2);

// Array
export interface Todo { task: string; complete: boolean }
export const todoList = state<Todo[]>([]);
export const completed = computed(todoList, (list) => list.filter(todo => todo.complete));
```

### mutator

The last hook we have is the `mutator`. When talking about the `state` hook, we mentioned that one of the ways to modify the state was using mutators.

```typescript
import { state, mutator } from "@micra/store-hooks";

// Incrementing/decrementing a counter
export const counter = state<number>(0);
export const increment = mutator(counter, (count, by: number = 1) => count + by);
export const decrement = mutator(counter, (count, by: number = 1) => count - by);

increment(10); // counter.value = 10;
decrement(20); // counter.value = -10;

// Managing a to-do list
export interface Todo { task: string; complete: boolean }
export const todoList = state<Todo[]>([]);
export const addTodo = mutator(todoList, (list, todo: Todo) => list.concat([todo]));
export const clearComplete = mutator(todoList, (list) => list.filter(todo => !todo.complete));
export const completeTodo = mutator(todoList, (list, task: string) =>
  list.map(todo => todo.task === task ? { ...todo, complete: true } : todo)
);

addTodo({ task: 'Write documentation', complete: false }); // [{ task: 'Write documentation', complete: false }]
completeTodo('Write documentation'); // [{ task: 'Write documentation', complete: true }]
clearComplete(); // []
```
