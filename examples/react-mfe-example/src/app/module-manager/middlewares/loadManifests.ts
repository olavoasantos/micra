import { ModuleManager } from '@micra/core';

export const loadManifests = async () => {
  const manifests = use<string[]>('app/module-manager/manifests');

  await use<ModuleManager>('ModuleManager').loadManifests(manifests);
};
