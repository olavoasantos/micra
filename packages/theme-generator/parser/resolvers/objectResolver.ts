import { parser } from '..';
import { ThemeResolver, ThemeToken } from '../types';

export const objectResolver: ThemeResolver = {
  check(definition) {
    return typeof definition === 'object' && definition != null && !Array.isArray(definition);
  },
  resolve(element, definition: ThemeToken, context) {
    return parser(definition, { context }).map((el) => {
      el.breadcrumbs = element.breadcrumbs.concat(el.breadcrumbs);
      el.path = el.breadcrumbs.join('.');
      el.main = el.breadcrumbs[0];
      return el;
    });
  },
};
