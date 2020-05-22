export interface TemplateEngine {
  render(template: string, variables?: Record<string, any>): string;
}
