import app from '@micra/application';
import { RouterConfig } from 'app/router/types';

app.config.set<RouterConfig>('router', {
  fallbackRoute: 'home',

  prefix: '/:lng(fr)?',

  middlewares: [

  ],
});
