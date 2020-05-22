export interface BaseLogger<C = Record<string, any>, E extends object = Record<string, any>> {
  config: C;
  create(namespace: string, options?: Partial<C>): Logger<C, E>;
  error(message: any, ...args: any[]): void;
  log(message: any, ...args: any[]): void;
  info(message: any, ...args: any[]): void;
  warn(message: any, ...args: any[]): void;
  trace(message: any, ...args: any[]): void;
}

export type Logger<C = Record<string, any>, E extends object = Record<string, any>> = BaseLogger<C, E> & E;
