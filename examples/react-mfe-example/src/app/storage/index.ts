/* eslint-disable import/no-unresolved */
import { ServiceProvider } from '@micra/service-provider';
import { BrowserStorage } from '@micra/browser-storage-wrapper';

export class StorageServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('Storage', BrowserStorage);
  }
}
