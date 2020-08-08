import { Options as PrettierOptions } from 'prettier';
import { CallbackContext } from '@micra/theme-generator';

export type FileDefinition = {
  type: 'file';
  path: string; // relative path to build path
  template: string; // absolute path to template
  format?: PrettierOptions; // prettier format options
  variables?: Record<string, any>; // extra variables to be passed to the template engine
};

export type ThemeDefinition =
  | {
      type: 'toGenericThemeType';
      path: string; // relative path to build path
      source: string; // relative path to CWD
      template?: string; // absolute path to template
      options?: { // toGenericThemeType partial options
        name?: string;
      };
      format?: PrettierOptions; // prettier format options
      variables?: Record<string, any>; // extra variables to be passed to the template engine
      transform?(ctx: CallbackContext): CallbackContext & Record<string, any>; // transforms context before build
    }
  | {
      type: 'toThemeType';
      path: string; // relative path to build path
      source: string; // relative path to CWD
      template?: string; // absolute path to template
      options?: { // toThemeType partial options
        name?: string;
        parent?: string;
      };
      variables?: Record<string, any>; // extra variables to be passed to the template engine
      format?: PrettierOptions; // prettier format options
      transform?(ctx: CallbackContext): CallbackContext & Record<string, any>; // transforms context before build
    }
  | {
      type: 'toCssVariables';
      path: string; // relative path to build path
      source: string; // relative path to CWD
      template?: string; // absolute path to template
      options?: { // toCssVariables partial options
        selector?: string;
      };
      variables?: Record<string, any>; // extra variables to be passed to the template engine
      format?: PrettierOptions; // prettier format options
      transform?(ctx: CallbackContext): CallbackContext & Record<string, any>; // transforms context before build
    }
  | {
      type: 'toCssVariablesThemeObject';
      path: string; // relative path to build path
      source: string; // relative path to CWD
      template?: string; // absolute path to template
      options?: { // toCssVariablesThemeObject partial options
        es6?: boolean;
      };
      variables?: Record<string, any>; // extra variables to be passed to the template engine
      format?: PrettierOptions; // prettier format options
      transform?(ctx: CallbackContext): CallbackContext & Record<string, any>; // transforms context before build
    }
  | {
      type: 'toThemeObject';
      path: string; // relative path to build path
      source: string; // relative path to CWD
      template?: string; // absolute path to template
      options?: { // toThemeObject partial options
        name?: string;
      };
      variables?: Record<string, any>; // extra variables to be passed to the template engine
      format?: PrettierOptions; // prettier format options
      transform?(ctx: CallbackContext): CallbackContext & Record<string, any>; // transforms context before build
    };

export type GeneratorDefinition = FileDefinition | ThemeDefinition;
