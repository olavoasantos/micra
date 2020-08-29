import { ValueParser } from '@micra/jsos';
import { rgbaValueParser } from './rgba/valueParser';

export const valueParsers: Record<string, ValueParser> = {
  rgba: rgbaValueParser,
};
