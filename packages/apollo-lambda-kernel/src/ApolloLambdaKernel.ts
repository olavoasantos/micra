import deepmerge from 'deepmerge';
import { Kernel } from '@micra/kernel';
import { GraphQLContainer } from '@micra/core';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import { ContextRequest } from './types';

export class ApolloLambdaKernel extends Kernel {
  run() {
    const graphql = this.container.use<GraphQLContainer>('GraphQL');

    if (this.container.has('DataLoaderCache') || this.container.has('Cache')) {
      graphql.config.cache = this.container.has('DataLoaderCache')
        ? this.container.use('DataLoaderCache')
        : this.container.use('Cache');
    }

    if (this.container.has('ErrorHandler')) {
      const errorHandler = this.container.use('ErrorHandler');
      graphql.config.formatError = errorHandler.handle.bind(errorHandler);
    }

    graphql.config.context = async (request: ContextRequest) => {
      const container = this.container.clone().value('Request', request);

      const context: Record<string, any> = { request };

      if (container.has('domains/services') && container.has('domains/data-sources')) {
        context.services = container.use('domains/services')(container.use('domains/data-sources'));
      }

      if (container.has('MakeContext')) {
        const customContext = await container.use('MakeContext')(context);

        return deepmerge(context, customContext);
      }

      return context;
    };

    graphql.config.schema = buildFederatedSchema({
      typeDefs: graphql.schema,
      resolvers: graphql.resolvers,
    });

    return new ApolloServer(graphql.config).createHandler();
  }
}
