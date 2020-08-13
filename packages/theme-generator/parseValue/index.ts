const valueParsers: Record<string, (...args: any[]) => string> = {
  from(value: string) {
    return value;
  },
  rgba(value: string, opacity: string) {
    return `rgba(${value}, ${opacity})`;
  },
}

export const parseValue = (value: string, callback: (value: string, meta: Record<string, any>) => string = (v) => v): string => {
  if (value.includes('::')) {
    const [fn, args] = value.split('::');
    if (valueParsers[fn]) {
      return callback(valueParsers[fn](...args.split('|').map(a => parseValue(a))), {
        fn,
        args,
      });
    }

    throw new SyntaxError(`Parser "${fn}" not defined`);
  }

  return callback(value, {});
};
