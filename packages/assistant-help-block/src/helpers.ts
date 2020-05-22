import { CLIHelpBlockListItem } from '@micra/core';

export const getMaxLength = (
  list: CLIHelpBlockListItem[],
  cb: keyof CLIHelpBlockListItem | ((item: CLIHelpBlockListItem) => string),
) => {
  return list.reduce((max: number, item) => {
    const value = typeof cb === 'string' ? (item[cb] as string) : cb(item);

    return value.length > max ? value.length : max;
  }, -1);
};

export const breakParagraph = (value: string, pad: number = 0) => {
  if (value.length < 1) return '';

  const maxLength = process.stdout.columns - pad - 2;

  return value
    .match(new RegExp(`.{1,${maxLength}}`, 'g'))
    ?.map((chunk, i) => {
      if (i > 0) {
        return ' '.repeat(pad + 2) + chunk;
      }

      return chunk;
    })
    .join('\n');
};
