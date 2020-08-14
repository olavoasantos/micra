import { themeParser } from '..';
import { ThemeResolver, ThemeTokens } from '../types';

export const objectResolver: ThemeResolver = {
  check(definition) {
    return typeof definition === 'object' && definition != null && !Array.isArray(definition);
  },
  resolve(element, definition: ThemeTokens, context) {
    return themeParser(definition, { context }).map((el) => {
      el.breadcrumbs = element.breadcrumbs.concat(el.breadcrumbs);
      el.path = el.breadcrumbs.join('.');
      el.main = el.breadcrumbs[0];
      return el;
    });
  },
};
