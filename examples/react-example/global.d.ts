/// <reference types="node" />
/// <reference types="react" />

type EnvVariables = {
  APP_NAME: string;
  APP_TOKEN: string;
  LOG_SERVICE_TOKEN: string;
  NODE_ENV: "development" | "production";
};

type Config = <T = any>(variable: string, fallback?: T) => T;
type Env = (variable: keyof EnvVariables, fallback?: string) => string;
type Use = import("@micra/tsyringe-service-container").TSyringeServiceContainer["use"];

declare const env: Env;
declare const use: Use;
declare const config: Config;

interface Window {
  config: Config;
  env: Env;
  use: Use;
}

declare namespace NodeJS {
  type ProcessEnv = EnvVariables;
  interface Global {
    config: Config;
    env: Env;
    use: Use;
  }
}
