# micra

## Stack

### Browser

- React, TS, ESLint, Prettier, Jest, React-testing-lib, Rollup (packages)/Webpack (services), Babel, Styled-Components

### Universal

- TS, ESLint, Prettier, Jest, Rollup, Babel

### Node.js

- TS, ESLint, Prettier, Jest, Babel

## Usage

### Install dependencies

```sh
yarn
```

### Start infrastructure

```sh
yarn start
```

This will start the following docker containers:

- Database: MariaDB

  - DATABASE: micra
  - USER: root
  - PASSWORD: root123

- Cache: Redis

  - PASSWORD: redis123

- Server: nginx

> Make sure you have Docker installed and running before starting the infrastructure.

## Development

### Create a new package on the monorepo

```sh
yarn make {TYPE} {WORKSPACE} {NAME}
```

- `{TYPE}`: Name of the starter package. All starter packages are in `scripts/starters`.
- `{WORKSPACE}`: Workspace to where the package should be created. The workspace should be one of the paths defined in the `package.json` `workspaces` list (or in the `lerna.json` packages list).
- `{NAME}`: Is the name of the package to be created.

### Running commands based on a workspace

Sometimes it's useful to run commands only on a given workspace. For instance, if you only want to build the API packages. To do this:

```sh
yarn run:scoped {WORKSPACE} {COMMAND}
```

- `{WORKSPACE}`: Workspace to where the package should be created. The workspace should be one of the paths defined in the `package.json` `workspaces` list (or in the `lerna.json` packages list).

- `{COMMAND}`: Command to be executed.
