import app from '@micra/application';
import { ReactDomKernel } from '@micra/react-dom-kernel';

/** Define your kernel */
app.registerKernel(ReactDomKernel);

/** Define your service providers */
app.registerProviders();

export { app };
