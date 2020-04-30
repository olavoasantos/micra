import { BrowserStore } from '@micra/browser-store';
import { WorkSessionState } from 'domains/work-session/types/WorkSessionStore';

export class WorkSessionStore extends BrowserStore<WorkSessionState> {
  initialState = {};
}

export default new WorkSessionStore();
