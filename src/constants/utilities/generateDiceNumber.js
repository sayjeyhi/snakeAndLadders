export default () => {
  const max = 6,
    min = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
