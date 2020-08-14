import { rgba } from './rgba';
import { fetchToken } from './fetchToken';
import { ThemeToken, ThemeTokenContext } from '../types';

export type MakeContext = (context: ThemeTokenContext) => Record<string, any>;

export const createContext = (
  tokens: ThemeToken,
  makeContext?: MakeContext,
): ThemeTokenContext => {
  const context = { tokens } as ThemeTokenContext;
  context.theme = fetchToken(context);
  context.rgba = rgba(context);

  return makeContext ? { ...context, ...makeContext(context) } : context;
};
