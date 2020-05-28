import { Kernel as KernelContract, ServiceContainer } from '@micra/core';

export class Kernel implements KernelContract {
  container: ServiceContainer;

  constructor(container: ServiceContainer) {
    this.container = container;
  }

  boot() {
    //
  }

  run(): any {
    //
  }
}
