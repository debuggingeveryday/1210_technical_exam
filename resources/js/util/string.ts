export const trimString = (value: string) => {
  const newString: string = value.replace('_', ' ');

  return newString;
};
