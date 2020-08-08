import { CLIRouter } from '@micra/cli-router';
import { init } from './init';
import { gen } from './gen';
import { create } from './create';
import { themeBuild } from './theme';

const router = use<CLIRouter>('Router');

router.define(init);
router.define(gen);
router.define(create);
router.define(themeBuild);
