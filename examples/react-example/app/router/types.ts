import { Middleware } from '@micra/route-registry';

export interface RouterConfig {
  fallbackRoute: string;
  prefix: string;
  middlewares: Middleware[];
}
