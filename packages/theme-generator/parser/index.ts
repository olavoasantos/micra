import {
  ThemeToken,
  ThemeElement,
  ThemeResolver,
  ThemeTokenDefinition,
  ThemeTokenDynamicDefinition,
  ThemeTokenContext,
  ElementType,
} from './types';

export const createThemeElement = (name: string, type: ElementType = 'PRIMARY'): ThemeElement => ({
  type,
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
      return parser(definition, context).map((el) => {
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
        element.type = 'DERIVED';
        element.value = Array.isArray(response) ? response.join(', ') : String(response);
        return [element];
      }

      return parser(response as ThemeToken, context).map((el) => {
        el.breadcrumbs = element.breadcrumbs.concat(el.breadcrumbs);
        el.path = el.breadcrumbs.join('.');
        el.main = el.breadcrumbs[0];
        el.type = 'DERIVED';
        return el;
      });
    },
  },
];

export const fetchToken = (theme: ThemeToken) => (path: string) => {
  return path.split('.').reduce((token: ThemeTokenDefinition, key) => {
    const value = token[key as keyof ThemeTokenDefinition];

    return value ?? key;
  }, theme as ThemeTokenDefinition) as ThemeTokenDefinition;
};

export const rgba = (tokens: ThemeToken) => {
  const theme = fetchToken(tokens);
  return (path: string, opacity: number) => {
    const value = theme(path);

    if (isPrimitive(value)) {
      const parsed = Array.isArray(value) ? value.join(', ') : String(value);
      return `rgba::${parsed}|${opacity}`;
    }

    throw new Error(`Invalid value found in rgba "${path}|${opacity}"`);
  };
};

export const parser = (
  definition: ThemeToken,
  context: ThemeTokenContext = {
    theme: fetchToken(definition),
    rgba: rgba(definition),
  },
  elements: ThemeElement[] = [],
) => {
  for (const [key, entry] of Object.entries(definition)) {
    const element = createThemeElement(key);

    for (const resolver of themeResolvers) {
      if (resolver.check(entry)) {
        elements = elements.concat(resolver.resolve(element, entry, context));
        break;
      }
    }
  }

  return elements;
};
