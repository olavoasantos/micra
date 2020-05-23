import './config';
import app from '@micra/application';
import { GenericKernel } from './kernel';
import { CLIHelpBlockServiceProvider } from './cli-help-block';
import { CLIParserServiceProvider } from './cli-parser';
import { ContextServiceProvider } from './context';
import { LoggerServiceProvider } from './logger';
import { RouterServiceProvider } from './router';
import { CLICoreServiceProvider } from './cli-core';
import { TemplateEngineServiceProvider } from './template-engine';

/** Define your kernel */
app.registerKernel(GenericKernel);

/** Define your service providers */
app.registerProviders(
  CLIHelpBlockServiceProvider,
  CLIParserServiceProvider,
  ContextServiceProvider,
  LoggerServiceProvider,
  RouterServiceProvider,
  CLICoreServiceProvider,
  TemplateEngineServiceProvider,
);

export { app };
