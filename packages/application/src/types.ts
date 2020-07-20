import { StaticKernel, StaticServiceContainer, StaticServiceProvider } from '@micra/core';

export interface AppConfig {
  container?: StaticServiceContainer;
  kernel?: StaticKernel;
  services?: StaticServiceProvider[];
}
