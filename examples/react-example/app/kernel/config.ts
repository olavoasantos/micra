import app from '@micra/application';
import App from 'app/kernel/_App';
import Providers from 'app/kernel/_Providers';

app.config.set('react-dom-kernel', {
  /**
   * DOM element ID in which the app
   * should be mounted.
   */
  domId: 'root',

  /**
   * App component
   */
  component: App,

  /**
   * Global error handler component
   */
  errorHandler: null,

  /**
   * React providers component
   */
  providers: Providers,
});
