import { createStoreHook } from '@micra/react-store-hooks';
import WorkSession, { WorkSessionStore } from 'domains/work-session/data/stores/WorkSessionStore';

export const useWorkSession = createStoreHook<WorkSessionStore>(WorkSession);
