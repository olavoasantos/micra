import { enumFactory } from 'node-factory';
import { Stage, HTTPMethod } from '../types/misc';

export const StageFactory = enumFactory<Stage>([
  'alpha',
  'dev',
  'staging',
  'prod',
]);

export const HTTPMethodFactory = enumFactory<HTTPMethod>([
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
]);
