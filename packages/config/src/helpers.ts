type GenericData = Array<any> | Record<string, any>;

const isMergeableObject = (val: GenericData) =>
  val &&
  typeof val === 'object' &&
  val.constructor.name === 'Object' &&
  Object.prototype.toString.call(val) !== '[object RegExp]' &&
  Object.prototype.toString.call(val) !== '[object Date]';

const emptyTarget = (val: GenericData) => (Array.isArray(val) ? [] : {});

const cloneIfNecessary = (value: any) => (isMergeableObject(value) ? deepMerge(emptyTarget(value), value) : value);

const arrayMerge = (target: any[], source: any[]) => [...target, ...source];

const mergeObject = (target: Record<string, any>, source: Record<string, any>) => {
  const destination: Record<string, any> = {};

  if (isMergeableObject(target)) {
    Object.keys(target).forEach((key: string) => {
      destination[key] = cloneIfNecessary(target[key]);
    });
  }

  Object.keys(source).forEach(key => {
    if (!isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneIfNecessary(source[key]);
    } else {
      destination[key] = deepMerge(target[key], source[key]);
    }
  });

  return destination;
};

export const deepMerge = (target: GenericData, source: GenericData) => {
  if (typeof target !== typeof source || Array.isArray(target) !== Array.isArray(source)) {
    throw new Error('Cannot merge two distinct elements');
  }

  return Array.isArray(source) ? arrayMerge(target as any[], source) : mergeObject(target as Record<string, any>, source);
};