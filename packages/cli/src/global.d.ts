/// <reference types="node" />
declare module 'rimraf';
type EnvVariables = {
  NODE_ENV: 'development' | 'production';
};

type Config = <T = any>(variable: string, fallback?: T) => T;
type Env = (variable: string, fallback?: any) => any;
type Use = import('@micra/tsyringe-service-container').TSyringeServiceContainer['use'];

declare const config: Config;
declare const env: Env;
declare const use: Use;
declare const hrstart: any;

declare namespace NodeJS {
  type ProcessEnv = EnvVariables;
  interface Global {
    config: Config;
    env: Env;
    use: Use;
    hrstart: any;
  }
}
