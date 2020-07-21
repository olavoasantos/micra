export const pathTo = (
  path: string,
  params: Record<string, any> = {},
  query: Record<string, any> = {}
) => {
  const route = use("router").find(path);
  if (route) {
    return route.toPath(
      {
        lng: use("translation").language,
        ...params,
      },
      query
    );
  }

  return path;
};
