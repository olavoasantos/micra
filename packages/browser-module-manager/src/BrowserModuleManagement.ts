import { ModuleDefinition, ModuleManager } from '@micra/core';

export class BrowserModuleManager implements ModuleManager {
  loadedModules: string[] = [];
  loadedManifests: string[] = [];
  modules: Record<string, ModuleDefinition> = {};

  define(name: string, moduleDefinition: Partial<ModuleDefinition>) {
    const definition = { name, ...moduleDefinition };

    this.modules[definition.name] = definition as ModuleDefinition;
    if (definition.modules) {
      definition.modules.forEach((subModule) => {
        this.define(subModule.name, subModule);
      });
    }

    return this;
  }

  async loadManifests(urls: string[]) {
    for (const url of urls) {
      if (!this.loadedManifests.includes(url)) {
        const manifest = (await (await fetch(url)).json()) as ModuleDefinition;
        this.define(manifest.name, manifest);
        this.loadedManifests.push(url);
      }
    }

    return this;
  }

  registerModule(name: string, definition: any) {
    this.define(name, { src: '' });
    this.loadedModules.push(name);
    (window as any)[name] = definition;

    return this;
  }

  async loadExternal(definition: ModuleDefinition) {
    return new Promise((resolve, reject) => {
      if ((window as any)[definition.name]) return resolve((window as any)[definition.name]);
      if (this.loadedModules.includes(definition.name)) return resolve();

      this.loadedModules.push(definition.name);
      const script = document.createElement('script');
      script.defer = true;
      script.src = definition.src;
      script.id = `$$module-${definition.name}$$`;
      script.addEventListener('load', () => {
        resolve((window as any)[definition.name]);
      });
      script.addEventListener('error', () => {
        reject(new Error(`Error loading ${definition.name}`));
      });

      document.head.appendChild(script);
    });
  }

  async load(reference: string): Promise<any[]> {
    const definition = this.modules[reference];
    if (!definition) {
      throw new Error(`Module "${reference}" is not defined`);
    }

    return await Promise.allSettled(
      [this.loadExternal(definition)].concat(
        (definition.dependencies || []).map((dep) => this.load(dep)),
      ),
    );
  }
}
