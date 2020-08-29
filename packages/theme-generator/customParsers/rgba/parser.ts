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
  ReplaceDeepTransformer,
} from '@micra/jsos';

const valueParserFunction = `rgba`;

const breadcrumbsToValueParserFunction: ReplaceDeepTransformer = (
  _,
  { breadcrumbs },
) => `${valueParserFunction}::${breadcrumbs}`;

export const rgbaParser = (context: JSOSParserContext) => (
  path: string,
  opacity: number,
): JSOSParserValueDefinition => {
  const value = context.get(path);

  if (isPrimitive(value)) {
    return `${valueParserFunction}::${value}|${opacity}`;
  }

  return replaceDeep(value, {
    context,
    breadcrumbs: path,
    transformers: {
      [STRING_TYPE]: breadcrumbsToValueParserFunction,
      [NUMERIC_TYPE]: breadcrumbsToValueParserFunction,
      [LIST_TYPE]: breadcrumbsToValueParserFunction,
      [BOOLEAN_TYPE]: breadcrumbsToValueParserFunction,
      [NULLISH_TYPE]: breadcrumbsToValueParserFunction,
    },
  });
};
