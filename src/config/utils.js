import {
  BOX_WIDTH,
  BOX_HEIGHT,
  GRID_WIDTH,
  GRID_HEIGHT
} from './variables';

let colorIndex = 0;
export function getRandomColor () {
  const colorPalette = ['#007ae1', '#ff2d55', '#4cd964', '#ff9500'];
  return colorPalette[(colorIndex++) % 4];
};

export function getLayout (width, height) {

  const gridWidth = width;
  const gridHeight = height;
  const boxWidth = width / 10;
  const boxHeight = height / 10;

  let layout = {};
  const oddRows = [1, 3, 5, 7, 9],
        evenRows = [0, 2, 4, 6, 8];

  for (let col = 1;  col <= 10 ; col++) {
    //even rows
    evenRows.map((row) => {
      layout[col + 10 * row] = {
        x: (col-1) * boxWidth + boxWidth / 2,
        y: gridHeight - (row * boxHeight + boxHeight / 2),
        id: col + 10 * row
      }
    });

    //odd rows
    oddRows.map((row) => {
      layout[col + 10 * row] = {
        x: gridWidth - ((col - 1)  * boxWidth + boxWidth / 2),
        y: gridHeight - (row * boxHeight + boxHeight / 2),
        id: col + 10 * row
      }
    });
  }
  return layout;
}

export function getPlayerCoordinates (pos, grid, boxPosition) {
  const { layout, box: { width, height } } = grid;  
  const x = layout[pos].x;
  const y = layout[pos].y;

  switch (boxPosition) {
    case 0: //top left
      return {
        x: x - width / 4,
        y: y - height / 4
      };

    case 1: //top right
      return {
        x: x + width / 4,
        y: y - height / 4
      };

    case 2: //bottom left
      return {
        x: x - width / 4,
        y: y + height / 4
      };

    case 3: //bottom right
      return {
        x: x + width / 4,
        y: y + height / 4
      };

    default:
      return {
        x: x,
        y: y
      };
  }
}

export function delay (callback) {
  return setTimeout(callback, 300);
}

export function getSnakes () {
  return (
    [
      {
        id: 1,
        startPos: 17,
        endPos: 7
      },
      {
        id: 2,
        startPos: 52,
        endPos: 29
      },
      {
        id: 3,
        startPos: 57,
        endPos: 38
      },
      {
        id: 4,
        startPos: 88,
        endPos: 18
      },
      {
        id: 5,
        startPos: 93,
        endPos: 70
      },
      {
        id: 6,
        startPos: 97,
        endPos: 79
      }
    ]
  );
}

export function getLadders () {
  return (
    [
      {
        id: 1,
        startPos: 3,
        endPos: 21
      },
      {
        id: 2,
        startPos: 8,
        endPos: 30
      },
      {
        id: 3,
        startPos: 28,
        endPos: 84
      },
      {
        id: 4,
        startPos: 58,
        endPos: 77
      },
      {
        id: 5,
        startPos: 80,
        endPos: 99
      },
      {
        id: 6,
        startPos: 90,
        endPos: 91
      }
    ]
  );
}
