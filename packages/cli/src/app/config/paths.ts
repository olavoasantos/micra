import { join } from 'path';
import { Config } from '@micra/config';

use<Config>('config').set('paths', {
  root: join(process.cwd(), 'src'),
});
