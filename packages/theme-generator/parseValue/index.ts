import { ParserArgs, ParseValueGenerator, ValueParser } from './types';

const valueParsers: Record<string, ValueParser> = {
  from(reference): string {
    return `${reference}`;
  },
  rgba(value, opacity): string {
    return `rgba(${value}, ${opacity})`;
  },
};

export const parseValue: ParseValueGenerator = (context) => (value, visitor = {}): string => {
  if (value.includes('::')) {
    const [fn, ...args] = value.split('::');
    if (valueParsers[fn]) {
      const fnArgs: ParserArgs = [
        ...args
          .join('::')
          .split('|')
          .map((a) => parseValue(context)(a, visitor)),
        context,
      ];

      const result = valueParsers[fn](...fnArgs);
      return visitor[fn]
        ? visitor[fn](result, {
            fn,
            value,
            context,
            args: fnArgs,
            parsers: valueParsers,
          })
        : result;
    }

    throw new SyntaxError(`Parser "${fn}" not defined`);
  }

  return visitor.value ? visitor.value(value, {}) : value;
};
