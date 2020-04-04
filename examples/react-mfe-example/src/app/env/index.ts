import 'reflect-metadata';
import app from '@micra/application';
import { TSyringeServiceContainer } from '@micra/tsyringe-service-container';

/** Register service container */
app.registerContainer(TSyringeServiceContainer);

/** Register env sources */
app.registerEnv();
