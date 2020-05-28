import { ServiceContainer } from './ServiceContainer';
import { Static } from './types';

export interface Kernel {
  container: ServiceContainer;
  boot(): void;
  run(): any;
}

export type StaticKernel = Static<Kernel, [ServiceContainer]>;
