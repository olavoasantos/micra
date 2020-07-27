import {
  ThemeToken,
  ThemeElement,
  ThemeResolver,
  ThemeTokenDefinition,
  ThemeTokenDynamicDefinition,
  ThemeTokenContext,
} from './types';

export const createThemeElement = (name: string): ThemeElement => ({
  main: name,
  path: name,
  breadcrumbs: [name],
  value: '',
});

export const isPrimitive = (definition: ThemeTokenDefinition): boolean => {
  return (
    typeof definition === 'string' || typeof definition === 'number' || Array.isArray(definition)
  );
};

export const themeResolvers: ThemeResolver[] = [
  {
    // string/number
    check(definition) {
      return typeof definition === 'string' || typeof definition === 'number';
    },
    resolve(element, definition: string | number) {
      element.value = String(definition);
      return [element];
    },
  },
  {
    // array
    check(definition) {
      return Array.isArray(definition);
    },
    resolve(element, definition: string[]) {
      element.value = definition.join(', ');
      return [element];
    },
  },
  {
    // object
    check(definition) {
      return typeof definition === 'object' && definition != null && !Array.isArray(definition);
    },
    resolve(element, definition: ThemeToken, context) {
      return parser(definition, [], context).map((el) => {
        el.breadcrumbs = element.breadcrumbs.concat(el.breadcrumbs);
        el.path = el.breadcrumbs.join('.');
        el.main = el.breadcrumbs[0];
        return el;
      });
    },
  },
  {
    // fn
    check(definition) {
      return typeof definition === 'function';
    },
    resolve(element, definition: ThemeTokenDynamicDefinition, context) {
      const response = definition(context);

      if (isPrimitive(response)) {
        element.value = Array.isArray(response) ? response.join(', ') : String(response);
        return [element];
      }

      return parser(response as ThemeToken, [], context).map((el) => {
        el.breadcrumbs = element.breadcrumbs.concat(el.breadcrumbs);
        el.path = el.breadcrumbs.join('.');
        el.main = el.breadcrumbs[0];
        return el;
      });
    },
  },
];

export const fetchToken = (theme: ThemeToken) => (path: string) => {
  return path.split('.').reduce((token, key) => {
    if (!(token as any)[key]) {
      throw new Error(`path "${path}" not found in theme`);
    }

    return (token as any)[key];
  }, theme as ThemeTokenDefinition) as ThemeTokenDefinition;
};

export const parser = (
  definition: ThemeToken,
  ast: ThemeElement[] = [],
  context: ThemeTokenContext = {
    theme: fetchToken(definition),
  },
) => {
  for (const [key, entry] of Object.entries(definition)) {
    const element = createThemeElement(key);

    for (const resolver of themeResolvers) {
      if (resolver.check(entry)) {
        ast = ast.concat(resolver.resolve(element, entry, context));
        break;
      }
    }
  }

  return ast;
};
