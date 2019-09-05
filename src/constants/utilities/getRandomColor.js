let colorIndex = 0;

/**
 * Random color
 * @returns {string}
 */
export default function getRandomColor() {
  const colorPalette = ['#a6c0e1', '#ffbaab', '#a1ff8a', '#ffcd59'];
  return colorPalette[colorIndex++ % 4];
}
