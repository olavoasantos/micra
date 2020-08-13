import { ThemeResolver } from '../types';
import { dataResolver } from './dataResolver';
import { arrayResolver } from './arrayResolver';
import { objectResolver } from './objectResolver';
import { functionResolver } from './functionResolver';

export const defaultResolvers: ThemeResolver[] = [
  dataResolver,
  arrayResolver,
  objectResolver,
  functionResolver,
];
