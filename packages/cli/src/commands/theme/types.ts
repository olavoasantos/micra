import { Options as PrettierOptions } from 'prettier';
import { TransformerCustomContext, ThemeGeneratorOptions } from '@micra/theme-generator';

export type FileDefinition = {
  type: 'file';
  path: string;
  template: string;
  format?: PrettierOptions;
  variables?: Record<string, any>;
};

export type ThemeDefinition =
  | {
      type: 'toGenericThemeType';
      path: string;
      source: string;
      template?: string;
      transformerOptions?: Record<string, any>;
      parserOptions?: Partial<ThemeGeneratorOptions>;
      format?: PrettierOptions;
      variables?: Record<string, any>;
      makeContext?(
        ctx: TransformerCustomContext<{ content: string }>,
      ): TransformerCustomContext & Record<string, any>;
    }
  | {
      type: 'toThemeType';
      path: string;
      source: string;
      template?: string;
      transformerOptions?: Record<string, any>;
      parserOptions?: Partial<ThemeGeneratorOptions>;
      variables?: Record<string, any>;
      format?: PrettierOptions;
      makeContext?(
        ctx: TransformerCustomContext<{ content: string }>,
      ): TransformerCustomContext & Record<string, any>;
    }
  | {
      type: 'toCssVariables';
      path: string;
      source: string;
      template?: string;
      transformerOptions?: Record<string, any>;
      parserOptions?: Partial<ThemeGeneratorOptions>;
      variables?: Record<string, any>;
      format?: PrettierOptions;
      makeContext?(
        ctx: TransformerCustomContext<{ content: string }>,
      ): TransformerCustomContext & Record<string, any>;
    }
  | {
      type: 'toScssVariables';
      path: string;
      source: string;
      template?: string;
      transformerOptions?: Record<string, any>;
      parserOptions?: Partial<ThemeGeneratorOptions>;
      variables?: Record<string, any>;
      format?: PrettierOptions;
      makeContext?(
        ctx: TransformerCustomContext<{ content: string }>,
      ): TransformerCustomContext & Record<string, any>;
    }
  | {
      type: 'toCssVariablesThemeObject';
      path: string;
      source: string;
      template?: string;
      transformerOptions?: Record<string, any>;
      parserOptions?: Partial<ThemeGeneratorOptions>;
      variables?: Record<string, any>;
      format?: PrettierOptions;
      makeContext?(
        ctx: TransformerCustomContext<{ content: string }>,
      ): TransformerCustomContext & Record<string, any>;
    }
  | {
      type: 'toThemeObject';
      path: string;
      source: string;
      template?: string;
      transformerOptions?: Record<string, any>;
      parserOptions?: Partial<ThemeGeneratorOptions>;
      variables?: Record<string, any>;
      format?: PrettierOptions;
      makeContext?(
        ctx: TransformerCustomContext<{ content: string }>,
      ): TransformerCustomContext & Record<string, any>;
    };

export type GeneratorDefinition = FileDefinition | ThemeDefinition;
