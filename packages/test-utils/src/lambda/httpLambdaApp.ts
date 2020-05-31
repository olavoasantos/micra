import { APIGatewayProxyEvent, Context as LambdaContext } from 'aws-lambda';
import { promisify } from 'util';
import { Handler } from '../types/aws';
import {
  APIGatewayProxyEventFactory,
  LambdaContextFactory,
} from '../factories/aws';

export const httpLambdaApp = (handler: Handler) => {
  return async (
    path: string,
    options?: {
      body: Record<string, any>;
      event: Partial<APIGatewayProxyEvent>;
      context: Partial<LambdaContext>;
    },
  ) =>
    await promisify(handler)(
      APIGatewayProxyEventFactory.make({
        path,
        body: JSON.stringify(options?.body ?? ''),
        ...(options?.event ?? {}),
      }),
      LambdaContextFactory.make(options?.context ?? {}),
    );
};
