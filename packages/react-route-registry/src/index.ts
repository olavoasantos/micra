import React from 'react';
import { BaseRouteRegistry, Route } from '@micra/route-registry';
import { ReactRouteRegistry } from './ReactRouteRegistry';

export * from './ReactRouteRegistry';
export type ReactRoute = Route<React.ComponentType<any>>;
export const router = new ReactRouteRegistry(new BaseRouteRegistry<'page', React.ComponentType<any>>());
