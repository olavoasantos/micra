import { CLIRouter } from '@micra/cli-router';
import { init } from 'commands/init';
import { gen } from 'commands/gen';

const router = use<CLIRouter>('Router');

router.define(init);
router.define(gen);
