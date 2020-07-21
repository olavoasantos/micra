import app from "@micra/application";
import { ReactDomKernelConfig } from "@micra/react-dom-kernel";
import App from "app/kernel/_App";
import Providers from "app/kernel/_Providers";

app.config.set<ReactDomKernelConfig>("react-dom-kernel", {
  /**
   * DOM element ID in which the app
   * should be mounted.
   */
  domId: "root",

  /**
   * App component
   */
  component: App,

  /**
   * React providers component
   */
  providers: Providers,
});
