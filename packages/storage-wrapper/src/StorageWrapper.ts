import { Storage } from '@micra/core';

export class StorageWrapper implements Storage {
  protected map: Map<string, number>;
  protected client: globalThis.Storage;

  constructor(client: globalThis.Storage) {
    this.client = client;
    this.map = new Map<string, number>();

    this.hydrate();
  }

  protected hydrate() {
    Array.from({ length: this.client.length }).forEach((_, i) => {
      const key = this.client.key(i);
      if (key) {
        this.map.set(key, i);
      }
    });
  }

  public async get<T = any>(key: string): Promise<T | null> {
    const value = this.client.getItem(key);

    return value ? JSON.parse(value) : null;
  }

  public async set<T = any>(key: string, value: T): Promise<T> {
    const length = this.client.length;

    this.client.setItem(key, JSON.stringify(value));
    this.map.set(key, length);

    return value;
  }

  public async remove<T = any>(key: string): Promise<T | null> {
    const value = await this.get(key);

    if (value) {
      this.client.removeItem(key);
      this.map.delete(key);
    }

    return value;
  }

  public async has(key: string): Promise<boolean> {
    return this.map.has(key);
  }

  public async clear(): Promise<boolean> {
    try {
      this.client.clear();
      this.map.clear();

      return true;
    } catch (e) {
      return false;
    }
  }

  public async keys(): Promise<string[]> {
    return Array.from(this.map.keys());
  }

  public async key(index: number): Promise<string | null> {
    return this.client.key(index);
  }
}
