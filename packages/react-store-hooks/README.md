# @micra/react-store-hooks

## Installation

```sh
yarn add @micra/react-store-hooks
```

## Hooks

### useStore

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

### createStoreHook

```tsx
import React from 'react';
import { state } from '@micra/store-hooks';
import { useStore } from '@micra/react-store-hooks';

const counter = state(0);
const useCounter = createStoreHook(counter);

const Counter = () => {
  const [count, setCount] = useCounter();

  return (
    <div>
      <h1>Count is {count}</h1>
      <button onClick={() => setCount(count + 1)}>increment</button>
      <button onClick={() => setCount(count - 1)}>decrement</button>
    </div>
  );
};
```

### useStoreValue

```tsx
import React from 'react';
import { state, mutator } from '@micra/store-hooks';
import { useStoreValue } from '@micra/react-store-hooks';

const counter = state(0);
const increment = mutator(counter, (count, e: React.MouseEvent) => count + 1);
const decrement = mutator(counter, (count, e: React.MouseEvent) => count - 1);

const Counter = () => {
  const count = useStoreValue(counter);

  return (
    <div>
      <h1>Count is {count}</h1>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
};
```
