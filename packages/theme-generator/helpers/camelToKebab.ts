export const camelToKebab = (value: string): string => {
  return value
    .replace(/[\w]([A-Z])/g, function (m) {
      return m[0] + '-' + m[1];
    })
    .toLowerCase();
};
