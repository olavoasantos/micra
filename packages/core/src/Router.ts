import { Route } from './Route';

export interface Router {
  has(path: string): boolean;
  routes(namespace?: string): Route[];
  find(path: string): Route | undefined;
}
