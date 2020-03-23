import { ServiceContainer } from './ServiceContainer';
import { Static } from './types';

export interface ServiceProvider {
  container: ServiceContainer;
  register?: () => void;
  boot?: () => void;
}

export type StaticServiceProvider = Static<ServiceProvider, [ServiceContainer]>;
