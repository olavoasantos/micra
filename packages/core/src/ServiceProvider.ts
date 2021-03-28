import { ServiceContainer } from './ServiceContainer';
import { Static } from './types';

export interface ServiceProvider {
  container: ServiceContainer;
  register?(): void | Promise<void>;
  boot?(): void | Promise<void>;
}

export type StaticServiceProvider = Static<ServiceProvider, [ServiceContainer]>;
