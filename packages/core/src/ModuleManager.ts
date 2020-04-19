import { ModuleDefinition } from './ModuleDefinition';

export interface ModuleManager {
  loadedModules: string[];
  loadedManifests: string[];
  modules: Record<string, ModuleDefinition>;
  define(name: string, moduleDefinition: Partial<ModuleDefinition>): this;
  loadManifests(urls: string[]): Promise<this>;
  registerModule(name: string, definition: any): this;
  loadExternal(definition: ModuleDefinition): Promise<any>;
  load(reference: string): Promise<any>;
}
