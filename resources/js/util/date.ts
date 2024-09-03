export const formatTime = (value: Date) => {
  const date = new Date(value);

  const dateformat =
    [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') +
    ' ' +
    [date.getHours(), date.getMinutes()].join(':');

  return dateformat;
};
