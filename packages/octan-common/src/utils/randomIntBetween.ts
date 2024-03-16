export const randomIntBetween = (min: number, max: number): number => {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(
    Math.random() * (maxInt - minInt) + minInt
  );
};
