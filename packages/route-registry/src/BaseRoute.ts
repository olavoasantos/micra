import { PathObject, toTest, toMatch, toPathBuilder } from '@micra/path-match';
import { createPath } from './helpers';
import { BaseRouteRegistry } from './BaseRouteRegistry';
import { Route } from './types';

export class BaseRoute<H> implements Route<H> {
  protected $path: string;

  protected $parent: BaseRouteRegistry<any, H>;

  public name = '';

  public prefix = '';

  public options: Record<string, any> = {};

  public middleware: ((ctx: Record<string, any>) => void)[] = [];

  public definition: PathObject;

  public handler: H;

  public test: (path: string) => boolean;

  public match: <T = Record<string, any>>(path: string) => T;

  public toPath: (params?: Record<string, any>, query?: Record<string, any>) => string;

  get path() {
    return `${this.$parent.prefix}${this.prefix}${this.$path}`;
  }

  get middlewares() {
    return [...this.$parent.middlewares, ...this.middleware];
  }

  constructor(parent: BaseRouteRegistry<any, H>, path: string, handler: H) {
    this.$path = path;
    this.$parent = parent;
    this.handler = handler;
    this.definition = createPath(this.path);
    this.test = toTest(this.definition);
    this.match = toMatch(this.definition);
    this.toPath = toPathBuilder(this.definition);
  }
}
