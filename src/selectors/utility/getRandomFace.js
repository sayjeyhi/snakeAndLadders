/**
 * Players default data
 * @type {number}
 */
let choosedPlayer = 0;
const playerFaces = [
  {
    name: 'دایناسور خبیث',
    avatar: 1,
  },
  {
    name: 'آهوی متعجب',
    avatar: 2,
  },
  {
    name: 'غول لش',
    avatar: 3,
  },
  {
    name: 'مارمولک بدهکار',
    avatar: 4,
  },
  {
    name: 'کرگدن تنبل',
    avatar: 5,
  },
  {
    name: 'جینگولک شاد',
    avatar: 6,
  },
  {
    name: 'شیطان مرموز',
    avatar: 7,
  },
  {
    name: 'هیولای ناناز',
    avatar: 8,
  },
  {
    name: 'مار خندان',
    avatar: 9,
  },
].sort((a, b) => 0.5 - Math.random());

/**
 * Get random player face
 * @returns {Object}
 */
export default function getRandomFace() {
  return playerFaces[choosedPlayer++ % playerFaces.length];
}
