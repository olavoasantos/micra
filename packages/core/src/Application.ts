import { Config } from './Config';
import { Environment, StaticEnvironment } from './Environment';
import { Kernel, StaticKernel } from './Kernel';
import { ServiceContainer, StaticServiceContainer } from './ServiceContainer';
import { ServiceProvider, StaticServiceProvider } from './ServiceProvider';
import { Static } from './types';

export interface Application {
  config: Config;
  env: Environment;
  container?: ServiceContainer;
  kernel?: Kernel;
  serviceProviders: ServiceProvider[];
  bootstrap(): void;
  start(): void;
  run(): void;
}

export type StaticApplication = Static<Application> & {
  global: any;
};
