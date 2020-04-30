import { StorageWrapper } from '../StorageWrapper';

describe('Storage tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return null if attempts to get an inexistent key', async () => {
    const storage = new StorageWrapper(localStorage);

    expect(await storage.get('INEXISTENT')).toBeNull();
  });

  it('should assign a JSON value to a given key', async () => {
    const storage = new StorageWrapper(localStorage);

    await storage.set('KEY', 'VALUE');

    expect(localStorage.getItem('KEY')).toBe('"VALUE"');
  });

  it('should return the value if attempts to get an existent key', async () => {
    const storage = new StorageWrapper(localStorage);

    await storage.set('EXISTENT', 'VALUE');

    expect(await storage.get('EXISTENT')).toBe('VALUE');
  });

  it('should remove a value', async () => {
    const storage = new StorageWrapper(localStorage);

    await storage.set('REMOVED', 'VALUE');
    await storage.remove('REMOVED');

    expect(localStorage.getItem('REMOVED')).toBeNull();
  });

  it('should return true if a key exists', async () => {
    const storage = new StorageWrapper(localStorage);

    await storage.set('EXISTENT', 'VALUE');

    expect(await storage.has('EXISTENT')).toBeTruthy();
  });

  it('should return false if a key does not exist', async () => {
    const storage = new StorageWrapper(localStorage);

    expect(await storage.has('INEXISTENT')).toBeFalsy();
  });

  it('should return all existing keys', async () => {
    const storage = new StorageWrapper(localStorage);

    await storage.set('KEY', 'VALUE');

    expect(await storage.keys()).toMatchObject(['KEY']);
  });

  it('should return an empty array if there are not keys', async () => {
    const storage = new StorageWrapper(localStorage);

    expect(await storage.keys()).toMatchObject([]);
  });

  it('should return the key with a given index', async () => {
    const storage = new StorageWrapper(localStorage);

    await storage.set('KEY', 'VALUE');

    expect(await storage.key(0)).toBe('KEY');
  });

  it('should return the null if a key with a given index does not exist', async () => {
    const storage = new StorageWrapper(localStorage);

    expect(await storage.key(0)).toBeNull();
  });

  it('should clear storage', async () => {
    const storage = new StorageWrapper(localStorage);
    await storage.set('KEY', 'VALUE');
    expect(await storage.key(0)).toBe('KEY');

    await storage.clear();

    expect(await storage.key(0)).toBeNull();
  });

  it('should hydrate the store based on previously set values', async () => {
    localStorage.setItem('KEY', 'VALUE');

    const storage = new StorageWrapper(localStorage);

    expect(await storage.has('KEY')).toBeTruthy();
  });
});
