import app from '@micra/application';
import { HTTPKernel } from 'app/kernel';

/** Define your kernel */
app.registerKernel(HTTPKernel);

/** Define your service providers */
app.registerProviders();

export { app };
