import { GraphQLContainer } from '@micra/core';
import merge from 'deepmerge';
import { join } from 'path';
import { readFileSync } from 'fs';
import { DocumentNode } from 'graphql';
import { Config } from 'apollo-server-core';
import { GraphQLResolverMap } from 'apollo-graphql';
import { DEFAULT_CONFIG } from './constants';

export class ApolloGraphQLContainer implements GraphQLContainer<GraphQLResolverMap, Config> {
  public config: Config;
  public resolvers: GraphQLResolverMap;
  public schema: (string | DocumentNode)[];

  constructor(config: Config = {}) {
    this.schema = [];
    this.resolvers = {};
    this.config = merge<Config>(DEFAULT_CONFIG, config);
  }

  public registerResolvers(resolvers: GraphQLResolverMap) {
    this.resolvers = merge<GraphQLResolverMap>(this.resolvers, resolvers);

    return this;
  }

  public registerSchema(...schemas: (string | DocumentNode)[]) {
    this.schema.push(...schemas);

    return this;
  }

  public loadSchema(...paths: string[]) {
    this.registerSchema(readFileSync(join(...paths), 'utf-8'));

    return this;
  }
}
