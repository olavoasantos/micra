import 'domains/work-session/data/events';

import app from '@micra/application';
import WorkSessionStore from 'domains/work-session/data/stores/WorkSessionStore';
import { useWorkSession } from 'domains/work-session/data/hooks/useWorkSession';
import { WorkSessionService } from 'domains/work-session/data/services/WorkSessionService';
import { WorkSessionLocalDataSource } from 'domains/work-session/data/data-sources/WorkSessionLocalDataSource';

app.container?.value('useWorkSession', useWorkSession);
app.container?.value('WorkSessionStore', WorkSessionStore);
app.container?.singleton('WorkSessionService', WorkSessionService);
app.container?.singleton('WorkSessionDataSource', WorkSessionLocalDataSource);
