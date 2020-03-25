import app from '@micra/application';
import { Kernel } from '@micra/kernel';

/** Define your kernel */
app.registerKernel(Kernel);

/** Define your service providers */
app
  .registerProviders
  //
  ();

export { app };
