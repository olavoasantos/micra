import { TemplateEngine } from '@micra/core';
import mustache from 'mustache';

export class MustacheTemplateEngine implements TemplateEngine {
  engine: typeof mustache = mustache;

  public render(template: string, variables: Record<string, any> = {}) {
    return this.engine.render(template, variables);
  }
}
