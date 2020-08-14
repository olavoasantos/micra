import { ValueParser } from '../types';

export const token: ValueParser = (reference): string => `${reference}`;
