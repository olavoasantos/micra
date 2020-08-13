import { ThemeResolver } from '../types';

export const arrayResolver: ThemeResolver = {
  check(definition) {
    return Array.isArray(definition);
  },
  resolve(element, definition: string[]) {
    element.value = definition.join(', ');
    return [element];
  },
};
