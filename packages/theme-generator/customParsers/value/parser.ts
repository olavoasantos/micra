import {
  BOOLEAN_TYPE,
  LIST_TYPE,
  NULLISH_TYPE,
  NUMERIC_TYPE,
  STRING_TYPE,
  isPrimitive,
  replaceDeep,
  JSOSParserContext,
  JSOSParserValueDefinition,
} from '@micra/jsos';

export const valueParser = (context: JSOSParserContext) => (
  path: string,
): JSOSParserValueDefinition => {
  let definition = context.raw;
  for (const key of path.split('.')) {
    if (
      isPrimitive(definition) ||
      (typeof definition !== 'function' && !definition[key])
    ) {
      return path;
    }

    definition =
      typeof definition === 'function' ? definition(context) : definition[key];
  }

  const value =
    typeof definition === 'function' ? definition(context) : definition;

  if (isPrimitive(value)) {
    return value;
  }

  return replaceDeep(value, {
    context,
    breadcrumbs: path,
    transformers: {
      [STRING_TYPE]: (element) => element,
      [NUMERIC_TYPE]: (element) => element,
      [LIST_TYPE]: (element) => element,
      [BOOLEAN_TYPE]: (element) => element,
      [NULLISH_TYPE]: (element) => element,
    },
  });
};
