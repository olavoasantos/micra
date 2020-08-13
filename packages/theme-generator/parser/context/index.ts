import { rgba } from './rgba';
import { fetchToken } from './fetchToken';
import { ThemeToken, ThemeTokenContext } from '../types';

export type MakeContext<E = ThemeTokenContext> = (
  context: ThemeTokenContext,
) => E & ThemeTokenContext;

const noop: MakeContext<ThemeTokenContext> = (c) => c;

export const createContext = (
  tokens: ThemeToken,
  makeContext: MakeContext = noop,
): ThemeTokenContext => {
  const context = { tokens } as ThemeTokenContext;
  context.theme = fetchToken(context);
  context.rgba = rgba(context);

  return makeContext(context);
};
