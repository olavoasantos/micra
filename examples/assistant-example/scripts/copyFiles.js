const glob = require('glob');
const { copyFileSync, existsSync, mkdirSync } = require('fs');
const { join, sep, dirname } = require('path');

const ext = ['mustache'];

const files = glob.sync(join(__dirname, `../src/**/*.${ext.length > 1 ? `{${ext.join('|')}}` : ext.join('|')}`));

const checkIfPathExists = (path) => {
  const pieces = path.split(sep);

  pieces.reduce((prevPath, piece) => {
    const currentPath = prevPath + sep + piece;

    if (!existsSync(currentPath)) {
      mkdirSync(currentPath);
    }

    return currentPath;
  }, join(__dirname, '../build'));
}

files.forEach(path => {
  const relative = path.replace(join(__dirname, '../src/'), '');

  checkIfPathExists(dirname(relative))

  copyFileSync(path, join(__dirname, '../build', relative));
});
