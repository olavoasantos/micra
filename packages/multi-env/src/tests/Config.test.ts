import { Config } from '../Config';

it('should return undefined if a key does not exist', () => {
  const config = new Config();

  expect(config.get('inexistent')).toBeUndefined();
  expect(config.get('inexistent.deep.value')).toBeUndefined();
});

it('should set a shallow value', () => {
  const config = new Config();

  config.set('shallow', 'value');

  expect(config.get('shallow')).toBe('value');
});

it('should set a deep value', () => {
  const config = new Config();

  config.set('deep.nested', 'value');

  expect(config.get('deep.nested')).toBe('value');
});

it('should set a nested object value', () => {
  const config = new Config();

  config.set('deep', {
    nested: 'value',
  });

  expect(config.get('deep.nested')).toBe('value');
});

it('should check if a value exists', () => {
  const config = new Config();

  config.set('deep', {
    nested: 'value',
  });

  expect(config.has('deep.nested')).toBeTruthy();
});

it('should return false if a value does not exist', () => {
  const config = new Config();

  config.set('deep', {
    nested: 'value',
  });

  expect(config.has('some.inexistent.value')).toBeFalsy();
});
