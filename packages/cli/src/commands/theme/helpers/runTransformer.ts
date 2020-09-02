import { ThemeGenerator, ThemeTransformer, ThemeTransformerOptions } from '@micra/theme-generator';
import { join } from 'path';
import prettier from 'prettier';
import { Context } from '../../../app/context/types';
import { ThemeDefinition } from '../types';

export const runTransformer = (
  transformer: (
    options?: Partial<ThemeTransformerOptions> | undefined,
  ) => ThemeTransformer<ThemeTransformerOptions>,
  { BUILD_PATH, DEFAULT_FORMAT }: any,
) => (
  theme: ThemeGenerator,
  definition: ThemeDefinition,
  { cwd, template, createFile }: Context,
) => {
  const format = definition.format ?? DEFAULT_FORMAT;
  const options = Object.assign({}, definition.transformerOptions || {});

  theme.to(
    transformer({
      ...options,
      callback(ctx) {
        if (definition.makeContext) {
          ctx = {
            ...ctx,
            ...definition.makeContext(ctx),
          };
        }

        let TEMPLATE = ctx.content;
        if (definition.template) {
          TEMPLATE = template(definition.template);
        }

        const FILE_PATH = join(BUILD_PATH, definition.path || '');
        const CONTENT = use('TemplateEngine').render(TEMPLATE, {
          ...(definition.variables || {}),
          CONTENT: ctx.content,
          BUILD_PATH,
          FILE_PATH,
          CTX: ctx,
        });

        createFile(cwd(FILE_PATH), prettier.format(CONTENT, format), true);
      },
    }),
  );
};
