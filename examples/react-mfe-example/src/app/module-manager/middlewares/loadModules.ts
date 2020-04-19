import { ModuleManager } from '@micra/core';
import { RouterMiddleware } from '@micra/react-router-web-router';

export const loadModules: RouterMiddleware = async ({ route }) => {
  const modules = use<ModuleManager>('ModuleManager');

  if (route.dependencies) {
    for (const name of route.dependencies) {
      await modules.load(name);
    }
  }
};
