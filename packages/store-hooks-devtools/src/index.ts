import { ValueState } from '@micra/store-hooks';

let reduxDevtools: any;
window.$$STORE_HOOKS$$ = {};

export const devtools = (stores: Record<string, ValueState>, options: Record<string, any> = {}) => {
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    if (!reduxDevtools) {
      reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__.connect(options);
    }

    Object.keys(stores).forEach((name) => {
      const store = stores[name];
      window.$$STORE_HOOKS$$[name] = store.value;

      store.on('update', () => {
        window.$$STORE_HOOKS$$[name] = store.value;
        reduxDevtools.send(`[${name}] Update`, window.$$STORE_HOOKS$$);
      });

      store.on('error', (error) => {
        reduxDevtools.error(`[${name}] sync error: ${error.message}`);
      });
    });

    reduxDevtools.send(
      `[store-hooks] init ${Object.keys(stores).join(', ')}`,
      window.$$STORE_HOOKS$$,
    );
  }
};
