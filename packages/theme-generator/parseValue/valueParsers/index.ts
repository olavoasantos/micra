import { rgba } from './rgba';
import { token } from './token';
import { ValueParser } from '../types';

export const valueParsers: Record<string, ValueParser> = {
  token,
  rgba,
};
