import { Storage } from '@micra/core';
import { WorkSessionDataSource as DataSource } from 'domains/work-session/types/WorkSessionDataSource';

export class WorkSessionLocalDataSource implements DataSource {
  storage: Storage;

  constructor(storage: Storage = use<Storage>('Storage')) {
    this.storage = storage;
  }
}
