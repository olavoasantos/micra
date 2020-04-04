import { ModuleManager } from '@micra/core';
import { ServiceProvider } from '@micra/service-provider';
import { BrowserModuleManager } from '@micra/browser-module-manager';

export class ModuleManagerServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('ModuleManager', BrowserModuleManager);
  }

  boot() {
    const modules = use<ModuleManager>('ModuleManager');

    modules.registerModule('test', {
      myTest: 123,
    });
  }
}
