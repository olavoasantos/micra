import { Config } from './Config';
import { Environment } from './Environment';
import { Kernel } from './Kernel';
import { ServiceContainer } from './ServiceContainer';
import { ServiceProvider } from './ServiceProvider';
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
