import { join } from 'path';

export const cwd = (...path: string[]) => join(process.cwd(), ...path);
