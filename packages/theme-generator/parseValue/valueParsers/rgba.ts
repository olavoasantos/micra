import { ValueParser } from '../types';

export const rgba: ValueParser = (value, opacity): string => `rgba(${value}, ${opacity})`;
