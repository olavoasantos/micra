import { BaseGeneratorContext } from '../generators/types';
import { ThemeElement } from '../parser/types';
import { ParserArgs, ParseValueGenerator, ValueParser } from './types';

const valueParsers: Record<string, ValueParser> = {
  from(reference): string {
    return `${reference}`;
  },
  rgba(value, opacity): string {
    return `rgba(${value}, ${opacity})`;
  },
};

export const parseValue: ParseValueGenerator = (context, customParsers = {}) => {
  const parsers = { ...valueParsers, ...customParsers };
  return (value, visitors = {}): string => {
    if (value.includes('::')) {
      const [fn, ...args] = value.split('::');
      if (parsers[fn]) {
        const fnArgs: ParserArgs = [
          ...args
            .join('::')
            .split('|')
            .map((a) => parseValue(context)(a, visitors)),
          context,
        ];

        const result = parsers[fn](...fnArgs);
        return visitors[fn]
          ? visitors[fn](result, {
            fn,
            value,
            context,
            args: fnArgs,
            parsers,
          })
          : result;
      }

      throw new SyntaxError(`Parser "${fn}" not defined`);
    }

    return visitors.value ? visitors.value(value, {}) : value;
  };
};
