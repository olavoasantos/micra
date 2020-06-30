import { State } from '@micra/store-hooks';

type AlpineEl = HTMLElement & {
  __x: {
    $data: Record<string, any>;
  };
};

type StoreNode = State | ((...arg: any[]) => any);

interface Stores {
  [key: string]: StoreNode | Stores;
}

export const initStores = (stores: Stores) => {
  document.querySelectorAll<AlpineEl>('[x-store]').forEach((el) => {
    const names = el.getAttribute('x-store') ?? '';
    names.split(',').forEach((name) => {
      const keys = name.split('.');
      const key = name.split('.').pop();
      const entry = keys.reduce((entry: Stores | StoreNode, key) => {
        if (!(entry as Stores)[key]) throw new Error('Path to store not found');
        return (entry as Stores)[key];
      }, stores);

      if (entry && (entry as State).subscribe) {
        el.setAttribute('x-init', `$${key} = $stores.${name}.value`);
        (entry as State).subscribe((value) => {
          if (el.__x) {
            el.__x.$data[`$${key}`] = value;
          }
        });
      } else {
        console.warn(`Store "${name}" is not defined`);
      }
      el.removeAttribute('x-store');
    });
  });

  return stores;
};
