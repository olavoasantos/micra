import { BrowserStore } from '@micra/browser-store';

export class MessageStore extends BrowserStore<any> {
  initialState = {};
}

export default new MessageStore();
