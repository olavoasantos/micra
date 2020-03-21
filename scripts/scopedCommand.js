const pkg = require('../package.json');
const { spawn } = require('child_process');
const { basename, resolve } = require('path');
const { existsSync, lstatSync, readdirSync } = require('fs');

/******************************************/

const root = (...path) => resolve(__dirname, '..', ...path);

const getList = path => readdirSync(path);

const isPkg = path => lstatSync(path).isDirectory();

const pkgName = path => `@${NAMESPACE}/${basename(path)}`;

const makeCmd = scope =>
  `yarn lerna run ${CMD} --stream --scope='${scope.includes(',') ? `{${scope}}` : scope}'`;

const error = msg => {
  console.error(`\nERROR: ${msg}\n`);
  process.exit(1);
};

/******************************************/

const NAMESPACE = pkg.name;
const CMD = process.argv[3];
const PATH = process.argv[2];

/******************************************/

if (!CMD) {
  error(`Please specify a command to run`);
}

if (!existsSync(PATH)) {
  error(`Path "${PATH}" doesn't exist`);
}

const SCOPE = getList(root(PATH))
  .reduce((pkgs, name) => {
    const path = root(PATH, name);

    if (isPkg(path)) {
      pkgs.push(pkgName(path));
    }

    return pkgs;
  }, [])
  .join(',');

if (!SCOPE) {
  console.error(`\nERROR: No packages found in "${PATH}"\n`);
} else {
  spawn(makeCmd(SCOPE), { stdio: 'inherit', shell: true });
}
