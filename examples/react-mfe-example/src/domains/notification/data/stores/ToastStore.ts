import { BrowserStore } from '@micra/browser-store';

export class ToastStore extends BrowserStore<any> {
  initialState = {};
}

export default new ToastStore();
