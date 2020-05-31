export const getFormattedDate = (date: Date, format = 'YYYY/MM/DD') => {
  const year = date.getFullYear().toString();
  const month = (1 + date.getMonth()).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('YY', year.substring(2))
    .replace('MM', month)
    .replace('DD', day);
};
