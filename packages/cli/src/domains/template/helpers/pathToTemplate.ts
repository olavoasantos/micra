import { join } from 'path';

export const pathToTemplate = (...path: string[]) => join(__dirname, '../stubs', ...path);
