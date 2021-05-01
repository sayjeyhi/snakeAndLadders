import { REDRAW, RESET_GRID } from '../../constants/types';

import {
  BOX_WIDTH,
  BOX_HEIGHT,
  GRID_WIDTH,
  GRID_HEIGHT,
} from '../../constants/variables';

import { getLayout, getGridMeasurement } from '../../constants/utilities';

const initialState = {
  layout: getLayout(GRID_WIDTH, GRID_HEIGHT),
  width: GRID_WIDTH,
  height: GRID_HEIGHT,
  box: {
    height: BOX_HEIGHT,
    width: BOX_WIDTH,
  },
};

export function grid(state = initialState, action) {
  if (action.type === REDRAW) {
    let newGrid = {};
    let newWidth = action.width - 64;
    let newHeight = action.height - 64;
    newWidth = getGridMeasurement(newWidth, newHeight);
    newGrid = {
      layout: getLayout(newWidth, newWidth),
      width: newWidth,
      height: newWidth,
      box: {
        height: newWidth / 10,
        width: newWidth / 10,
      },
    };
    return {
      ...state,
      ...newGrid,
    };
  } else if (action.type === RESET_GRID) {
    return {
      ...initialState,
    };
  } else {
    return state;
  }
}
