import { camelToKebab } from './camelToKebab';

export const pathToKebab = (path: string): string => path.split('.').map(camelToKebab).join('-');
