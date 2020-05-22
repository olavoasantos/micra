import 'app/config';
import app from '@micra/application';
import { GenericKernel } from 'app/kernel';
import { CLIHelpBlockServiceProvider } from 'app/cli-help-block';
import { CLIParserServiceProvider } from 'app/cli-parser';
import { ContextServiceProvider } from 'app/context';
import { LoggerServiceProvider } from 'app/logger';
import { RouterServiceProvider } from 'app/router';
import { CLICoreServiceProvider } from 'app/cli-core';
import { TemplateEngineServiceProvider } from 'app/template-engine';

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
