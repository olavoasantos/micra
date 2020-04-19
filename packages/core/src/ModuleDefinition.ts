export interface ModuleDefinition {
  name: string;
  src: string;
  alias?: string;
  dependencies?: string[];
  modules?: ModuleDefinition[];
}
