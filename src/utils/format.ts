export const convertStringToURLSlug = (input: string) => {
  return input
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};
