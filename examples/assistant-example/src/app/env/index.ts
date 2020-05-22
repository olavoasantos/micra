import 'reflect-metadata';
import app from '@micra/application';
import moduleAlias from 'module-alias';
import { DotEnv } from '@micra/dot-env';
import { TSyringeServiceContainer } from '@micra/tsyringe-service-container';

/** Register absolute paths */
moduleAlias.addPath(__dirname + '/../../');

/** Register service container */
app.registerContainer(TSyringeServiceContainer);

/** Register env sources */
app.registerEnv(DotEnv);
