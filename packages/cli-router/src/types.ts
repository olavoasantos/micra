import { RouteMiddleware, CLIArgumentSchema, CLIOptionSchema } from '@micra/core';

export type CLIRouteNamespaces = 'command';

export type CLICommand = {
  command: string;
  handler: RouteMiddleware<any>;
  description?: string;
  arguments?: CLIArgumentSchema[];
  options?: CLIOptionSchema[];
  middlewares?: RouteMiddleware[];
};
