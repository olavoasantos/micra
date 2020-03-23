import {
  ServiceProvider as ServiceProviderContract,
  ServiceContainer,
} from '@micra/core';

export class ServiceProvider implements ServiceProviderContract {
  container: ServiceContainer;

  constructor(container: ServiceContainer) {
    this.container = container;
  }

  register() {
    //
  }

  boot() {
    //
  }
}
