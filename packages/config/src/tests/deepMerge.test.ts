import { deepMerge } from '../helpers';

it('should merge two objects', () => {
  const target = { a: 1 };
  const values = { b: 2 };

  expect(deepMerge(target, values)).toMatchObject({
    a: 1,
    b: 2,
  });
});

it('should merge two deep objects', () => {
  const target = { a: 1, c: { d: 3 } };
  const values = { b: 2, c: { e: 4 } };

  expect(deepMerge(target, values)).toMatchObject({
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: 4,
    },
  });
});

it('should overwrite values', () => {
  const target = { a: 1 };
  const values = { a: 2 };

  expect(deepMerge(target, values)).toMatchObject({
    a: 2,
  });
});

it('should overwrite deep values', () => {
  const target = { a: { b: 1 }, c: 3 };
  const values = { a: { b: 2 }, d: 4 };

  expect(deepMerge(target, values)).toMatchObject({
    a: { b: 2 },
    c: 3,
    d: 4,
  });
});
