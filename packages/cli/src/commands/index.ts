import { CLIRouter } from '@micra/cli-router';
import { init } from './init';
import { gen } from './gen';

const router = use<CLIRouter>('Router');

router.define(init);
router.define(gen);
