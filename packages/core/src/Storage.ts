export interface Storage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<string | null>;
  remove(key: string): Promise<string | null>;
  has(key: string): Promise<boolean>;
  keys(): Promise<string[]>;
  key(index: number): Promise<string | null>;
  clear(): Promise<boolean>;
}
