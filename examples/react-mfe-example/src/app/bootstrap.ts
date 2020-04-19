import app from '@micra/application';
import { ReactDomKernel } from '@micra/react-dom-kernel';
import { ModuleManagerServiceProvider } from 'app/module-manager';
import { RouterServiceProvider } from 'app/router';
import { ApplicationServiceProvider } from 'app/application';
import { EventsServiceProvider } from 'app/events';

/** Define your kernel */
app.registerKernel(ReactDomKernel);

/** Define your service providers */
app.registerProviders(
  ModuleManagerServiceProvider,
  RouterServiceProvider,
  EventsServiceProvider,
  ApplicationServiceProvider,
);

export { app };
