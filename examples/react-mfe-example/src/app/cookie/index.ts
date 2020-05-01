/* eslint-disable import/no-unresolved */
import { ServiceProvider } from '@micra/service-provider';
import { BrowserCookie } from '@micra/browser-cookie';

export class CookieServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('Cookie', BrowserCookie);
  }
}
