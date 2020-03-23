import { Static } from './types';

export interface ServiceContainer {
  register<T = any>(namespace: any, to: Static<T>): this;
  singleton<T = any>(namespace: any, to: any): this;
  value<T = any>(namespace: any, value: T): this;
  factory<T = any>(namespace: any, value: (dependencyContainer: any) => T): this;
  use<T = any>(namespace: any): T;
  has<T = any>(namespace: any): boolean;
  clone(): ServiceContainer;
}

export type StaticServiceContainer = Static<ServiceContainer>;
