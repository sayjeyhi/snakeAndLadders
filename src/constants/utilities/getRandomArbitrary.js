/**
 * Get random number
 * @param min
 * @param max
 * @returns {number}
 */
export default (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
