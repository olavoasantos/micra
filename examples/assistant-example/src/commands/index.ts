import { CLIRouter } from '@micra/cli-router';
import { init } from 'commands/init';

const router = use<CLIRouter>('Router');

router.define(init);
