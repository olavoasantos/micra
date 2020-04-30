import { BrowserStore } from '@micra/browser-store';

export class BreadcrumbStore extends BrowserStore<any> {
  initialState = {};
}

export default new BreadcrumbStore();
