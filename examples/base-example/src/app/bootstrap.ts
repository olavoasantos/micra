import app from '@micra/application';
import { GenericKernel } from 'app/kernel';

/** Define your kernel */
app.registerKernel(GenericKernel);

/** Define your service providers */
app.registerProviders();

export { app };
