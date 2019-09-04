/**
 * Player coordinates in rect
 * @param pos
 * @param grid
 * @param boxPosition
 * @returns {{x: number, y: *}|{x: *, y: *}|{x: *, y: number}|{x: number, y: number}}
 */
export default function getPlayerCoordinates(pos, grid, boxPosition = 4) {
  const {
    layout,
    box: { width, height },
  } = grid;
  const x = layout[pos].x;
  const y = layout[pos].y;

  switch (boxPosition) {
    case 0: //top left
      return {
        x: x - width / 4,
        y: y - height / 4,
      };

    case 1: //top right
      return {
        x: x + width / 4,
        y: y - height / 4,
      };

    case 2: //bottom left
      return {
        x: x - width / 4,
        y: y + height / 4,
      };

    case 3: //bottom right
      return {
        x: x + width / 4,
        y: y + height / 4,
      };

    default:
      return {
        x: x,
        y: y,
      };
  }
}
