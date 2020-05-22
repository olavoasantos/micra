import { singleton } from '@micra/tsyringe-service-container';
import { ChalkLogger } from '@micra/chalk-logger';

@singleton()
export class Logger extends ChalkLogger {}
