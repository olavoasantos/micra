import app from '@micra/application';
import { ReactKernel } from 'app/kernel';

/** Define your kernel */
app.registerKernel(ReactKernel);

/** Define your service providers */
app.registerProviders();

export { app };
