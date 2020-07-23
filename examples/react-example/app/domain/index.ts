import { ServiceProvider } from '@micra/service-provider';

export class DomainServiceProvider extends ServiceProvider {
  boot() {
    require('domains');
  }
}
