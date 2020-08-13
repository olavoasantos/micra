export interface DeepPartial<T = string> {
  [key: string]: T | DeepPartial<T>;
}
