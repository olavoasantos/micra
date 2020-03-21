const pkg = require('../package.json');
const { resolve } = require('path');
const {
  copySync,
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} = require('fs-extra');

/******************************************/

const root = (...path) => resolve(__dirname, '..', ...path);

const getList = path => readdirSync(path);

const isPkg = path => lstatSync(path).isDirectory();

const pkgName = () => `@${NAMESPACE}/${NAME}`;

const toReadableList = (list = [], connect = 'and') => {
  if (list.length < 2) return list.join('');
  const last = list.pop();

  return `${list.join(', ')} ${connect} ${last}`;
};

const error = msg => {
  console.error(`\nERROR: ${msg}\n`);
  process.exit(1);
};

/******************************************/

const NAMESPACE = pkg.name;
const TYPE = process.argv[2];
const PATH = process.argv[3];
const NAME = process.argv[4];
const PKG_PATH = `${PATH}/${NAME}`;
const STARTER_PATH = 'scripts/starters';

const TYPES = getList(root(STARTER_PATH)).filter(name =>
  isPkg(root(STARTER_PATH, name)),
);

/******************************************/

if (!TYPE) {
  error(`Please specify a type: ${toReadableList(TYPES, 'or')}`);
}

if (!TYPES.includes(TYPE)) {
  error(
    `Type is not valid. Please choose either ${toReadableList(TYPES, 'or')}`,
  );
}

if (!PATH) {
  error(`Please specify a path`);
}

if (!NAME) {
  error(`Please specify a name for the package`);
}

if (!existsSync(root(PATH))) {
  error(`Path "${PATH}" doesn't exist`);
}

if (existsSync(root(PKG_PATH))) {
  error(`Package "${PKG_PATH}" already exists`);
}

/******************************************/

copySync(root('scripts/starters', TYPE), root(`${PKG_PATH}`));

if (existsSync(root(`${PKG_PATH}/package.json`))) {
  const PKG_JSON = readFileSync(
    root(`${PKG_PATH}/package.json`),
    'utf-8',
  ).replace('{{ NAME }}', pkgName());

  writeFileSync(root(`${PKG_PATH}/package.json`), PKG_JSON);
}

console.log(`Package created at: ${PKG_PATH}`);
