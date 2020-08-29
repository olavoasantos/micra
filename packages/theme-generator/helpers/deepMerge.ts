type GenericObject = Record<string | number, unknown>;

export const deepMerge = <A = GenericObject, B = GenericObject>(
  target: A,
  values: B,
): A & B => {
  const targetKeys = Object.keys(target);
  return Object.entries(values).reduce(
    (result: Partial<A & B>, [key, value]) => {
      if (
        targetKeys.includes(key) &&
        typeof (target as GenericObject)[key] !== typeof value
      )
        throw new Error(
          `Inconsistent values while merging "${key}"\n- from:\n${JSON.stringify(
            values,
          )}\n- into\n${JSON.stringify(target)}`,
        );

      if (!targetKeys.includes(key)) {
        result[key as keyof B] = value;
      } else if (
        typeof value === 'object' &&
        value != null &&
        value.constructor.name === 'Object'
      ) {
        result[key as keyof B] = deepMerge(target[key as keyof A], value);
      } else {
        result[key as keyof B] = value;
      }

      return result;
    },
    { ...target },
  ) as A & B;
};
