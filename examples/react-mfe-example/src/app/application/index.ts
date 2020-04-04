import { ServiceProvider } from '@micra/service-provider';
import { App } from 'app/application/App';

export class ApplicationServiceProvider extends ServiceProvider {
  register() {
    this.container.value('App', App);
  }
}
