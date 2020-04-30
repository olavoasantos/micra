import { BrowserStore } from '@micra/browser-store';

export class AuthStore extends BrowserStore<any> {
  initialState = {};
}

export default new AuthStore();
