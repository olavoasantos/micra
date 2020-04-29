export class InMemoryStorage implements globalThis.Storage {
  protected map: Map<string, string>;

  constructor() {
    this.map = new Map<string, string>();
  }

  setItem(key: string, value: string) {
    this.map.set(key, value);
  }

  getItem(key: string) {
    return this.map.get(key) || null;
  }

  removeItem(key: string) {
    this.map.delete(key);
  }

  get length() {
    return this.map.size;
  }

  key(i: number) {
    const keys = Array.from(this.map.keys());
    return keys[i] || null;
  }

  clear() {
    this.map.clear();
  }
}
