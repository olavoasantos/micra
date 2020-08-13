import { ThemeResolver } from '../types';

export const dataResolver: ThemeResolver = {
  check(definition) {
    return typeof definition === 'string' || typeof definition === 'number';
  },
  resolve(element, definition: string | number) {
    element.value = String(definition);
    return [element];
  },
};
