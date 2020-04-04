import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ModuleManager, ModuleDefinition } from '@micra/core';
import { ServiceProvider } from '@micra/service-provider';
import { BrowserModuleManager } from '@micra/browser-module-manager';

export class ModuleManagerServiceProvider extends ServiceProvider {
  manifests: string[] = [];

  register() {
    this.container.singleton('ModuleManager', BrowserModuleManager);
    this.container.value('app/module-manager/manifests', this.manifests);
  }

  boot() {
    const modules = use<ModuleManager>('ModuleManager');

    modules.registerModule('React', React);
    modules.registerModule('styled', styled);
    modules.registerModule('ReactDOM', ReactDOM);

    // eslint-disable-next-line global-require
    require('modules.json').forEach((definition: ModuleDefinition) =>
      modules.define(definition.name, definition),
    );
  }
}
