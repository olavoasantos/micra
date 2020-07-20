import { Config } from '@micra/core';
import { Kernel } from '@micra/kernel';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactDomKernelConfig } from './types';

export class ReactDomKernel extends Kernel {
  run() {
    const config = this.container.use<Config>('config').get<ReactDomKernelConfig>('react-dom-kernel') as ReactDomKernelConfig;

    ReactDOM.render(<config.providers><config.component /></config.providers>, document.getElementById(config.domId));
  }
}
