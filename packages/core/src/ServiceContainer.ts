import { Static } from './types';

export interface ServiceContainer {
  register<K extends keyof Application.Services, T extends Application.Services[K]>(namespace: K, to: Static<T>): this;
  singleton<K extends keyof Application.Services, T extends Application.Services[K]>(namespace: K, to: Static<T>): this;
  value<K extends keyof Application.Services, T extends Application.Services[K]>(namespace: K, to: T): this;
  factory<K extends keyof Application.Services, T extends Application.Services[K]>(namespace: K, to: (dependencyContainer: any) => T): this;
  use<K extends keyof Application.Services, T extends Application.Services[K]>(namespace: K): T;
  has(namespace: any): boolean;
  clone(): ServiceContainer;
}

export type StaticServiceContainer = Static<ServiceContainer>;
