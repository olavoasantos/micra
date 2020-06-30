# @micra/store-hooks-devtools

## Installation

```sh
yarn add @micra/store-hooks-devtools
```

## Usage

```typescript
import { state } from '@micra/store-hooks';
import { devtools } from '@micra/store-hooks-devtools';

export const counter = state(0);
export const todos = state<any[]>([]);

devtools({
  counter,
  todos,
});
```
