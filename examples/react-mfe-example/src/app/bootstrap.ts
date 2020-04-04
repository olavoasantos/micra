import app from '@micra/application';
import { ReactDomKernel } from '@micra/react-dom-kernel';
import { ModuleManagerServiceProvider } from 'app/module-manager';

/** Define your kernel */
app.registerKernel(ReactDomKernel);

/** Define your service providers */
app.registerProviders(ModuleManagerServiceProvider);

export { app };
