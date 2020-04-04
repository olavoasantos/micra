import { Config } from '@micra/config';
import {
  Application as ApplicationContract,
  Config as ConfigContract,
  Environment,
  Kernel,
  ServiceContainer,
  ServiceProvider,
  StaticEnvironment,
  StaticKernel,
  StaticServiceContainer,
  StaticServiceProvider,
} from '@micra/core';
import { MultiEnv } from '@micra/multi-env';

export class Application implements ApplicationContract {
  static get global() {
    if (
      typeof window !== 'undefined' &&
      typeof window.document !== 'undefined'
    ) {
      return window;
    }

    if (
      typeof process !== 'undefined' &&
      process.versions != null &&
      process.versions.node != null
    ) {
      return global;
    }

    if (
      typeof self === 'object' &&
      self.constructor &&
      self.constructor.name === 'DedicatedWorkerGlobalScope'
    ) {
      return self;
    }

    return {};
  }

  config: ConfigContract;
  container?: ServiceContainer;
  env: Environment;
  kernel?: Kernel;
  serviceProviders: ServiceProvider[] = [];

  constructor() {
    this.env = new MultiEnv();
    this.config = new Config();
    this.bootstrap();
  }

  registerContainer(container: StaticServiceContainer) {
    this.container = new container();
    this.container.value('app', this);
    this.container.value('env', this.env);
    this.container.value('config', this.config);

    Application.global.use = this.container.use.bind(this.container);

    return this;
  }

  async registerEnv(...envs: StaticEnvironment[]) {
    (this.env as MultiEnv).addSources(...envs);

    await this.env.init();

    return this;
  }

  registerKernel(kernel: StaticKernel) {
    if (!this.container) {
      throw new Error(
        `Service container not defined. ` +
          `Try registering a container by using registerContainer before registering your kernel.`,
      );
    }
    this.kernel = new kernel(this.container);

    return this;
  }

  registerProviders(...providers: StaticServiceProvider[]) {
    if (!this.container) {
      throw new Error(
        `Service container not defined. ` +
          `Try registering a container by using registerContainer before registering your providers.`,
      );
    }
    providers.forEach((provider) =>
      this.serviceProviders.push(
        new provider(this.container as ServiceContainer),
      ),
    );

    return this;
  }

  bootstrap() {
    // Initialize config
    Application.global.config = (key: string, fallback?: any) => {
      return this.config.get(key) || fallback;
    };
    // Initialize env
    Application.global.env = (key: string, fallback?: any) => {
      return this.env.get(key) || fallback;
    };
  }

  start() {
    if (!this.container) {
      throw new Error(
        `Service container not defined. ` +
          `Try registering a container by using registerContainer before starting the application.`,
      );
    }

    if (!this.kernel) {
      throw new Error(
        `Kernel not defined. ` +
          `Try registering a kernel by using registerKernel before starting the application.`,
      );
    }

    this.serviceProviders.forEach((provider) => {
      if (provider.register) {
        provider.register();
      }
    });

    this.serviceProviders.forEach((provider) => {
      if (provider.boot) {
        provider.boot();
      }
    });

    this.kernel?.boot();
  }

  run() {
    this.start();
    this.kernel?.run();
  }
}