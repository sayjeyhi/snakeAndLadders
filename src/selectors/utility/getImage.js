import { loadImage } from 'canvas';

/**
 * Load image source to use in canvas
 * @param src
 * @returns {Promise<Image | void>}
 */
export default async function getImage(src) {
  return loadImage(src)
    .then(image => image)
    .catch(err => console.log(err));
}
