export interface GraphQLContainer<T = any, C = any> {
  config: C;
  resolvers: T;
  schema: (string | any)[];
  registerResolvers(resolvers: T): this;
  loadSchema(...paths: string[]): this;
  registerSchema(...schemas: this['schema']): this;
}
