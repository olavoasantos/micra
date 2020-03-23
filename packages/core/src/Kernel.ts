import { ServiceContainer } from './ServiceContainer';
import { Static } from './types';

export interface Kernel {
  container: ServiceContainer;
  boot(): void;
  run(): void;
}

export type StaticKernel = Static<Kernel, [ServiceContainer]>;
