export type CookieOptions = {
  expiresAt?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
};

export interface Cookie {
  get(key: string): string | null;
  set(key: string, value: string, options?: CookieOptions): string | null;
  remove(key: string, options?: CookieOptions): string | null;
  has(key: string): boolean;
}
