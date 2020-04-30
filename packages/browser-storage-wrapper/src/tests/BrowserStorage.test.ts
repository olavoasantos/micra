import { BrowserStorage } from '../BrowserStorage';

describe('BrowserStorage tests', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should return null if attempts to get an inexistent key', async () => {
    const storage = new BrowserStorage();

    expect(await storage.get('INEXISTENT')).toBeNull();
  });

  it('should set the key/value pair on the memory driver by default', async () => {
    const storage = new BrowserStorage();

    await storage.set('KEY', 'VALUE');

    expect(await storage.memory.get('KEY')).toBe('VALUE');
  });

  it('should set the key/value pair on the given driver', async () => {
    const storage = new BrowserStorage();

    await storage.set('KEY', 'VALUE', 'persistent');

    expect(await storage.persistent.get('KEY')).toBe('VALUE');
  });

  it('should return the value if attempts to get an existent key', async () => {
    const storage = new BrowserStorage();

    await storage.set('EXISTENT', 'VALUE');

    expect(await storage.get('EXISTENT')).toBe('VALUE');
  });

  it('should remove a value', async () => {
    const storage = new BrowserStorage();

    await storage.set('REMOVED', 'VALUE');
    await storage.remove('REMOVED');

    expect(await storage.get('REMOVED')).toBeNull();
  });

  it('should return true if a key exists', async () => {
    const storage = new BrowserStorage();

    await storage.set('EXISTENT', 'VALUE');

    expect(await storage.has('EXISTENT')).toBeTruthy();
  });

  it('should return false if a key does not exist', async () => {
    const storage = new BrowserStorage();

    expect(await storage.has('INEXISTENT')).toBeFalsy();
  });

  it('should return all existing keys', async () => {
    const storage = new BrowserStorage();

    await storage.set('KEY', 'VALUE');

    expect(await storage.keys()).toMatchObject(['KEY']);
  });

  it('should return an empty array if there are not keys', async () => {
    const storage = new BrowserStorage();

    expect(await storage.keys()).toMatchObject([]);
  });

  it('should return the key with a given index', async () => {
    const storage = new BrowserStorage();

    await storage.set('KEY', 'VALUE');

    expect(await storage.key(0)).toBe('KEY');
  });

  it('should return the null if a key with a given index does not exist', async () => {
    const storage = new BrowserStorage();

    expect(await storage.key(0)).toBeNull();
  });

  it('should clear storage', async () => {
    const storage = new BrowserStorage();
    await storage.set('KEY', 'VALUE');
    expect(await storage.key(0)).toBe('KEY');

    await storage.clear();

    expect(await storage.key(0)).toBeNull();
  });
});
