import { ServiceProvider } from '@micra/service-provider';
import { MustacheTemplateEngine } from '@micra/mustache-template-engine';

export class TemplateEngineServiceProvider extends ServiceProvider {
  register() {
    this.container.singleton('TemplateEngine', MustacheTemplateEngine);
  }
}
