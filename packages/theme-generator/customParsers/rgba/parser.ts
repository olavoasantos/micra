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

const breadcrumbsToValueParserFunction: (opacity: number) => ReplaceDeepTransformer = (opacity: number) => (
  _,
  { breadcrumbs },
) => `${valueParserFunction}::${breadcrumbs}|${opacity}`;

export const rgbaParser = (context: JSOSParserContext) => (
  path: string,
  opacity: number,
): JSOSParserValueDefinition => {
  const value = context.get(path);

  if (isPrimitive(value)) {
    return `${valueParserFunction}::${value}|${opacity}`;
  }

  const visitor = breadcrumbsToValueParserFunction(opacity);

  return replaceDeep(value, {
    context,
    breadcrumbs: path,
    transformers: {
      [STRING_TYPE]: visitor,
      [NUMERIC_TYPE]: visitor,
      [LIST_TYPE]: visitor,
      [BOOLEAN_TYPE]: visitor,
      [NULLISH_TYPE]: visitor,
    },
  });
};
