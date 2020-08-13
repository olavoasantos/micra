import { themeParser } from '..';
import { isPrimitive } from '../helpers';
import { ThemeResolver, ThemeToken, ThemeTokenDynamicDefinition } from '../types';

export const functionResolver: ThemeResolver = {
  check(definition) {
    return typeof definition === 'function';
  },
  resolve(element, definition: ThemeTokenDynamicDefinition, context) {
    const response = definition(context);

    if (isPrimitive(response)) {
      element.value = Array.isArray(response) ? response.join(', ') : String(response);
      return [element];
    }

    return themeParser(response as ThemeToken, { context }).map((el) => {
      el.breadcrumbs = element.breadcrumbs.concat(el.breadcrumbs);
      el.path = el.breadcrumbs.join('.');
      el.main = el.breadcrumbs[0];
      return el;
    });
  },
};
