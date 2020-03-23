import { ServiceContainer, Static } from '@micra/core';
import { container, InjectionToken, DependencyContainer } from 'tsyringe';

export class TSyringeServiceContainer implements ServiceContainer {
  public container: DependencyContainer;

  constructor(serviceContainer?: DependencyContainer) {
    this.container = serviceContainer ?? container;
  }

  register<T = any>(namespace: InjectionToken<T>, to: Static<T>) {
    this.container.register<T>(namespace, { useClass: to });

    return this;
  }

  singleton<T = any>(namespace: InjectionToken<T>, to: InjectionToken<T>) {
    this.container.registerSingleton<T>(namespace, to);

    return this;
  }

  value<T = any>(namespace: InjectionToken<T>, value: T) {
    this.container.register<T>(namespace, { useValue: value });

    return this;
  }

  factory<T = any>(namespace: InjectionToken<T>, value: (dependencyContainer: DependencyContainer) => T) {
    this.container.register<T>(namespace, { useFactory: value });

    return this;
  }

  use<T = any>(namespace: InjectionToken<T>) {
    return this.container.resolve<T>(namespace);
  }

  has<T = any>(namespace: InjectionToken<T>) {
    return this.container.isRegistered(namespace);
  }

  clone() {
    return new TSyringeServiceContainer(container.createChildContainer());
  }
}
