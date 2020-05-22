import { nameFromPath } from '../nameFromPath';

describe('nameFromPath tests', () => {
  it('should get the name of the file', () => {
    expect(nameFromPath('/path/to/file.ext')).toBe('file');
  });

  it('should get the name of the directory if the file name is index', () => {
    expect(nameFromPath('/path/to/directory/index.ext')).toBe('directory');
  });
});
