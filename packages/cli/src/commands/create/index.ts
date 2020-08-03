import rimraf from 'rimraf';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { CLICommand } from '@micra/cli-router';
import { Context } from '../../app/context/types';

export const create: CLICommand = {
  command: 'create',
  description: 'Creates a new project',
  arguments: [
    { name: 'template', description: 'Type of project', required: true },
    {
      name: 'path',
      description: 'Relative path to create the project',
      default: './',
    },
  ],
  options: [
    {
      name: 'name',
      alias: 'n',
      description: 'Project name',
      default: undefined,
    },
    {
      name: 'organization',
      alias: 'o',
      description: 'Organization name',
      default: undefined,
    },
    {
      name: 'repo',
      alias: 'r',
      description: 'Git username',
      default: undefined,
    },
  ],
  async handler({
    createFile,
    cwd,
    defaultVariables,
    nameFromPath,
    parser,
    variationsOf,
    makeSurePathExists,
  }: Context) {
    const log = use('Logger');
    const engine = use('TemplateEngine');
    const TEMPLATE = parser.getArgument(0)?.value;
    const RELATIVE_PATH = parser.getArgument(1)?.value;
    const PATH = cwd(RELATIVE_PATH);
    const REPO = parser.getOption('repo')?.value
    const ORGANIZATION = parser.getOption('organization')?.value
      ? `@${parser.getOption('organization')?.value}/`
      : '';

    const NAME = variationsOf(
      parser.getOption('name')?.value || nameFromPath(PATH + '.'),
    );
    const PKG = `${ORGANIZATION}${NAME.LOWERCASE}`;

    log.log(`Creating project based on ${TEMPLATE} template...\n`);

    makeSurePathExists(PATH);
    execSync(
      `git clone git@github.com:micrajs/${TEMPLATE}-template.git .`,
      {
        stdio: [0, 1, 2],
        cwd: PATH,
      },
    );
    rimraf.sync(cwd(RELATIVE_PATH, '.git'));

    log.log(`\nUpdating references...`);

    // README
    createFile(
      cwd(RELATIVE_PATH, 'README.md'),
      engine.render(
        readFileSync(cwd(RELATIVE_PATH, 'README.md'), 'utf-8'),
        defaultVariables({
          NAME,
          PKG,
          ORGANIZATION,
          PATH,
          REPO,
        }),
      ),
      true,
    );

    // src/index.ts
    createFile(
      cwd(RELATIVE_PATH, 'src/index.ts'),
      engine.render(
        readFileSync(cwd(RELATIVE_PATH, 'src/index.ts'), 'utf-8'),
        defaultVariables({
          NAME,
          PKG,
          ORGANIZATION,
          PATH,
          REPO,
        }),
      ),
      true,
    );

    // package.json
    createFile(
      cwd(RELATIVE_PATH, 'package.json'),
      engine.render(
        readFileSync(cwd(RELATIVE_PATH, 'package.json'), 'utf-8').replace(
          new RegExp(`@micra/${TEMPLATE}-template`, 'g'),
          PKG,
        ),
        defaultVariables({
          NAME,
          PKG,
          ORGANIZATION,
          PATH,
          REPO,
        }),
      ),
      true,
    );

    log.log(`\nInstalling dependencies...`);

    execSync(
      `yarn`,
      {
        stdio: [0, 1, 2],
        cwd: PATH,
      },
    );

    execSync(
      `git init`,
      {
        cwd: PATH,
      },
    );

    log.log(`\nProject created in: ${PATH}`);
  },
};
