import { Config } from './Config';
import { Environment } from './Environment';
import { Kernel } from './Kernel';
import { ServiceContainer } from './ServiceContainer';
import { ServiceProvider, StaticServiceProvider } from './ServiceProvider';
import { Static } from './types';

export interface Application {
  config: Config;
  env: Environment;
  container?: ServiceContainer;
  kernel?: Kernel;
  serviceProviders: ServiceProvider[];
  initializeProvider(provider: StaticServiceProvider): any;
  bootstrap(): void;
  start(): void;
  run(): any;
}

export type StaticApplication = Static<Application> & {
  global: any;
};
