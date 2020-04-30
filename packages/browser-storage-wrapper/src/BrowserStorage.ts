import { Storage as StorageInterface } from '@micra/core';
import { InMemoryStorage } from '@micra/in-memory-storage';
import { Storage } from '@micra/storage-wrapper';

export type DRIVERS = 'memory' | 'session' | 'persistent';

export class BrowserStorage implements StorageInterface {
  public memory: Storage;
  public session: Storage;
  public persistent: Storage;
  protected drivers: DRIVERS[] = ['memory', 'session', 'persistent'];

  constructor() {
    this.session = new Storage(sessionStorage);
    this.persistent = new Storage(localStorage);
    this.memory = new Storage(new InMemoryStorage());
  }

  public async get(key: string, driver?: DRIVERS): Promise<string | null> {
    if (driver) {
      return await this[driver].get(key);
    }

    for (const storage of this.drivers) {
      const selectedStorage = this[storage];
      if (await selectedStorage.has(key)) {
        return await selectedStorage.get(key);
      }
    }

    return null;
  }

  public async set(key: string, value: string, driver: DRIVERS = 'memory'): Promise<string | null> {
    return await this[driver].set(key, value);
  }

  public async remove(key: string, driver?: DRIVERS): Promise<string | null> {
    if (driver) {
      return await this[driver].remove(key);
    }

    for (const storage of this.drivers) {
      const selectedStorage = this[storage];
      if (await selectedStorage.has(key)) {
        return await selectedStorage.remove(key);
      }
    }

    return null;
  }

  public async has(key: string, driver?: DRIVERS): Promise<boolean> {
    if (driver) {
      return await this[driver].has(key);
    }

    for (const storage of this.drivers) {
      if (await this[storage].has(key)) {
        return true;
      }
    }

    return false;
  }

  public async keys(driver?: DRIVERS): Promise<string[]> {
    if (driver) {
      return await this[driver].keys();
    }

    const keys = [];
    for (const storage of this.drivers) {
      keys.push(...(await this[storage].keys()));
    }

    return keys;
  }

  public async key(index: number, driver?: DRIVERS): Promise<string | null> {
    if (driver) {
      return await this[driver].key(index);
    }

    for (const storage of this.drivers) {
      const key = await this[storage].key(index);
      if (key) {
        return key;
      }
    }

    return null;
  }

  public async clear(driver?: DRIVERS): Promise<boolean> {
    if (driver) {
      return await this[driver].clear();
    }

    try {
      for (const storage of this.drivers) {
        await this[storage].clear();
      }

      return true;
    } catch (error) {
      console.error(`[BROWSER STORAGE] ${error}`);
      return false;
    }
  }
}
