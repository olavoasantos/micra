import {
  JSOSParserDefinition,
  JSOSParserElement,
  JSOSParserElementType,
  JSOSTransformerContext,
  JSOSTransformerFunction,
} from '@micra/jsos';
import { deepMerge } from '../helpers/deepMerge';
import { camelToKebab } from '../helpers/camelToKebab';
import { pathToObject } from '../helpers/pathToObject';
import { pathToKebab } from '../helpers/pathToKebab';

export type TransformerCustomContext<T = {}> = T & {
  tokens: JSOSParserDefinition;
  transformer: ThemeTransformer;
  elements: JSOSParserElement[];
  deepMerge: typeof deepMerge;
  pathToKebab: typeof pathToKebab;
  camelToKebab: typeof camelToKebab;
  pathToObject: typeof pathToObject;
};

export type TransformerContext = TransformerCustomContext &
  JSOSTransformerContext;

export interface ThemeTransformerOptions {
  callback?: (context: TransformerCustomContext<{ content: string }>) => void;
  willTransform?: (elements: JSOSParserElement[]) => JSOSParserElement[];
}

export interface ThemeTransformer<
  T extends ThemeTransformerOptions = ThemeTransformerOptions
> {
  options: T;
  visitors: Partial<Record<JSOSParserElementType, JSOSTransformerFunction>>;
}
