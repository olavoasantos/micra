import { Cookie, CookieOptions } from '@micra/core';

export class BrowserCookie implements Cookie {
  public get(key: string): string | null {
    if (!key || !this.has(key)) {
      return null;
    }

    return decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          `(?:(?:^|.*;)\\s*${encodeURIComponent(key).replace(
            /[-.+*]/g,
            '\\$&',
          )}\\s*\\=\\s*([^;]*).*$)|^.*$`,
        ),
        '$1',
      ),
    );
  }

  public set(key: string, value: string, options: CookieOptions = {}): string | null {
    if (!key || !this.has(key) || /^(?:expires|max-age|path|domain|secure)$/i.test(key)) {
      return null;
    }

    let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    if (options.expiresAt) {
      cookie += `; expires=${this.daysToUTC(options.expiresAt)}`;
    }

    if (options.domain) {
      cookie += `; domain=${encodeURIComponent(options.domain)}`;
    }

    if (options.path) {
      cookie += `; path=${encodeURIComponent(options.path)}`;
    }

    if (options.secure) {
      cookie += `; secure`;
    }

    document.cookie = `${cookie};`;

    return value;
  }

  public remove(key: string, options: CookieOptions = {}): string | null {
    if (!key || !this.has(key)) {
      return null;
    }

    const value = this.get(key);

    let cookie = `${encodeURIComponent(key)}=`;
    cookie += `; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    if (options.domain) {
      cookie += `; domain=${encodeURIComponent(options.domain)}`;
    }

    if (options.path) {
      cookie += `; path=${encodeURIComponent(options.path)}`;
    }

    if (options.secure) {
      cookie += `; secure`;
    }

    document.cookie = `${cookie};`;

    return value;
  }

  public has(key: string): boolean {
    if (!key || !this.has(key)) {
      return false;
    }

    return new RegExp(
      `(?:^|;\\s*)${encodeURIComponent(key).replace(/[-.+*]/g, '\\$&')}\\s*\\=`,
    ).test(document.cookie);
  }

  protected daysToUTC(expiration?: string | number | Date) {
    if (!expiration) {
      return '';
    }

    if (typeof expiration === 'number' && expiration === Infinity) {
      return 'Tue, 19 Jan 2038 03:14:07 GMT';
    }

    if (typeof expiration === 'number') {
      const date = new Date();
      date.setTime(date.getTime() + expiration * 24 * 60 * 60 * 1000);
      return date.toUTCString();
    }

    if (expiration instanceof Date) {
      return expiration.toUTCString();
    }

    return expiration;
  }
}
