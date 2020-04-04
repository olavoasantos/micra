type Use = import('@micra/core').ServiceContainer['use'];

declare const use: Use;

interface Window {
  use: Use;
}
