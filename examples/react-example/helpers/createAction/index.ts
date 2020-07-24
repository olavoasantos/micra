import {
  useQuery,
  queryCache,
  QueryOptions,
  QueryResultBase,
} from 'react-query';

export type UseQueryOptions<T, P> = {
  ref?: string;
  payload?: P;
} & QueryOptions<T>;
export type UseLazyResponse<T> = [
  QueryResultBase<T>['refetch'],
  QueryResultBase<T>,
];

export const createAction = <T = any, P = any>(
  name: string,
  queryFn: (args?: P) => Promise<T>,
) => ({
  name,

  run({ ref = '', payload, ...options }: UseQueryOptions<T, P> = {}) {
    return useQuery(
      this.name + ref,
      async () => await queryFn(payload),
      options,
    );
  },

  lazy({
    ref = '',
    payload,
    ...options
  }: UseQueryOptions<T, P> = {}): UseLazyResponse<T> {
    const response = useQuery(
      this.name + ref,
      async () => await queryFn(payload),
      {
        ...options,
        enabled: false,
      },
    );

    return [response.refetch, response];
  },

  invalidate() {
    queryCache.invalidateQueries(this.name);
  },
});
