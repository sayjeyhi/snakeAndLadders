import getRandomArbitrary from './getRandomArbitrary';

const wrapEmoji = emoji =>
  `<span role="img" aria-label="emoji">${emoji}</span>`;

/**
 * Give random emoji based on range
 * @param range
 * @returns {string}
 */
export function random(range) {
  let emoji;
  switch (range) {
    case 1:
    case 2:
      emoji = sad();
      break;
    case 3:
    case 4:
      emoji = regular();
      break;
    case 5:
    case 6:
      emoji = happy();
      break;
    default:
      emoji = sad();
  }
  return wrapEmoji(emoji);
}

/**
 * Gives random sad emoji
 * @returns {*}
 */
export function sad() {
  const array = ['😤', '🥺', '🤢', '😔', '🥺', '😑', '🤬'];
  const emoji = array[getRandomArbitrary(0, array.length - 1)];

  return wrapEmoji(emoji);
}

/**
 * Gives random emoji
 * @returns {string}
 */
export function regular() {
  const array = ['🤗', '😝', '😌', '🥴', '🤓'];
  const emoji = array[getRandomArbitrary(0, array.length - 1)];

  return wrapEmoji(emoji);
}

/**
 * Gives happy emoji
 * @returns {string}
 */
export function happy() {
  const array = ['😍', '😎', '🤩', '😏', '😈'];
  const emoji = array[getRandomArbitrary(0, array.length - 1)];

  return wrapEmoji(emoji);
}
