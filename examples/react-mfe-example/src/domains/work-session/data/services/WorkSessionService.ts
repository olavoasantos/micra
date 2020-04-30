import { WorkSessionDataSource } from 'domains/work-session/types/WorkSessionDataSource';
import { WorkSessionService as Service } from 'domains/work-session/types/WorkSessionService';

export class WorkSessionService implements Service {
  workSessionDataSource: WorkSessionDataSource;

  constructor(
    workSessionDataSource: WorkSessionDataSource = use<WorkSessionDataSource>(
      'WorkSessionDataSource',
    ),
  ) {
    this.workSessionDataSource = workSessionDataSource;
  }
}
