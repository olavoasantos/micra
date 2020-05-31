import { APIGatewayProxyEvent, Context as LambdaContext } from 'aws-lambda';
import { promisify } from 'util';
import { Handler } from '../types/aws';
import {
  APIGatewayProxyEventFactory,
  LambdaContextFactory,
} from '../factories/aws';

export interface GraphQLRequest {
  query: string;
  variables?: Record<string, any>;
}

export const graphqlLambdaApp = (handler: Handler) => {
  return async (
    body: GraphQLRequest,
    options?: {
      event: Partial<APIGatewayProxyEvent>;
      context: Partial<LambdaContext>;
    },
  ) =>
    await promisify(handler)(
      APIGatewayProxyEventFactory.make({
        body: JSON.stringify(body),
        httpMethod: 'POST',
        ...(options?.event ?? {}),
      }),
      LambdaContextFactory.make(options?.context ?? {}),
    ).then((resp) => {
      return resp?.body
        ? {
            ...resp,
            body:
              typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body,
          }
        : resp;
    });
};
