import app from '@micra/application';
import { ReactDomKernel } from '@micra/react-dom-kernel';
import { ModuleManagerServiceProvider } from 'app/module-manager';
import { RouterServiceProvider } from 'app/router';
import { ApplicationServiceProvider } from 'app/application';
import { EventsServiceProvider } from 'app/events';
import { CookieServiceProvider } from 'app/cookie';
import { StorageServiceProvider } from 'app/storage';

/** Define your kernel */
app.registerKernel(ReactDomKernel);

/** Define your service providers */
app.registerProviders(
  ModuleManagerServiceProvider,
  RouterServiceProvider,
  EventsServiceProvider,
  CookieServiceProvider,
  StorageServiceProvider,
  ApplicationServiceProvider,
);

export { app };
