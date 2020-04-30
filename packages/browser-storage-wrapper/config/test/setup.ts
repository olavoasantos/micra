import { InMemoryStorage } from '@micra/in-memory-storage';

(global as any).localStorage = new InMemoryStorage();
(global as any).sessionStorage = new InMemoryStorage();
