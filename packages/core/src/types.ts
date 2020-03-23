export interface Static<T, A extends Array<any> = []> {
  new (...args: A): T;
}
