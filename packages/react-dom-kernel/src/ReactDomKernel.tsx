import { Kernel } from '@micra/kernel';
import React from 'react';
import ReactDOM from 'react-dom';

export class ReactDomKernel extends Kernel {
  boot() {
    //
  }

  run() {
    const App = this.container.use<React.ComponentType<any>>('App');

    ReactDOM.render(<App />, document.getElementById('root'));
  }
}
