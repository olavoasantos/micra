import { BrowserStore } from '@micra/browser-store';

export class MetaStore extends BrowserStore<any> {
  initialState = {};
}

export default new MetaStore();
