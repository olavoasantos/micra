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
