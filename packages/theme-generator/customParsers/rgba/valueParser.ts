import { ValueParser } from '@micra/jsos';

export const rgbaValueParser: ValueParser = (value, opacity): string =>
  `rgba(${value}, ${opacity})`;
