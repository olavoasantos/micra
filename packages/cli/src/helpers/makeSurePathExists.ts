import { sep } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const makeSurePathExists = (path: string) => {
  const pieces = path.split(sep);

  pieces.reduce((prevPath, piece) => {
    const currentPath = prevPath + sep + piece;

    if (!existsSync(currentPath)) {
      mkdirSync(currentPath);
    }

    return currentPath;
  }, '');
};
