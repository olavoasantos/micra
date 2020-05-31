import { ServiceContainer } from '@micra/core';
import { APIGatewayEvent, APIGatewayEventRequestContext } from 'aws-lambda';

export type MakeContext<Args extends Array<any> = [DefaultContext], C = any> = (
  ...args: Args
) => C | Promise<C>;

export interface ContextRequest {
  event: APIGatewayEvent;
  context: APIGatewayEventRequestContext;
}

export interface DefaultContext {
  container: ServiceContainer;
  event: APIGatewayEvent;
  context: APIGatewayEventRequestContext;
}
