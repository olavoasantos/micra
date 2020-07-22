# @micra/store-hooks-persist

## Installation

```sh
yarn add @micra/store-hooks-persist
```

## Usage

### Basic

```ts
import { state } from '@micra/store-hooks';
import { persist } from '@micra/store-hooks-persist';

const counter = state<number>(0);

persist({
  stores: {
    counter,
  },
});
```

### Remove stored value

```ts
import { state } from '@micra/store-hooks';
import { persist } from '@micra/store-hooks-persist';

const counter = state<number>(0);

const remove = persist({
  stores: {
    counter,
  },
});

remove('counter'); // deletes counter value stored
```

### Saving part of the store

```ts
import { state, computed } from '@micra/store-hooks';
import { persist } from '@micra/store-hooks-persist';

interface Counter {
  count: number;
  someInfo: string;
}
const counter = state<Counter>({
  count: 0,
  someInfo: 'that wont be persisted',
});

persist({
  stores: {
    counter: computed(counter, ({ count }) => ({ count })),
  },
});
```

> IMPORTANT: the computed value passed to `persist.stores` should be the store's PARTIAL value as this will be merged into the store. If the shape is different, it'll overwrite the store's state and cause bugs.

### Custom prefix

> Defaults to `$SHP:`

```ts
import { state } from '@micra/store-hooks';
import { persist } from '@micra/store-hooks-persist';

const counter = state<number>(0);

persist({
  prefix: 'MY_PERSISTED_STATE_',
  stores: {
    counter,
  },
});
```

### Custom expiration

> Defaults to 24h

```ts
import { state } from '@micra/store-hooks';
import { persist } from '@micra/store-hooks-persist';

const counter = state<number>(0);

persist({
  expiration: 300, // in seconds
  stores: {
    counter,
  },
});
```

### Custom storage

> Defaults to localStorage

```ts
import { state } from '@micra/store-hooks';
import { persist } from '@micra/store-hooks-persist';

const counter = state<number>(0);

persist({
  to: sessionStorage,
  stores: {
    counter,
  },
});
```
