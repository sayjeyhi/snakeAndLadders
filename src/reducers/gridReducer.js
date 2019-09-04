import { REDRAW } from '../actions/GameActions';

import {
  BOX_WIDTH,
  BOX_HEIGHT,
  GRID_WIDTH,
  GRID_HEIGHT,
} from '../selectors/variables';

import { getLayout, getGridMeasurement } from '../selectors/utility';

const initialState = {
  grid: {
    layout: getLayout(GRID_WIDTH, GRID_HEIGHT),
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    occupancy: _initializeOccupancy(),
    box: {
      height: BOX_HEIGHT,
      width: BOX_WIDTH,
    },
  },
};

export function grid(state = initialState, action) {
  switch (action.type) {
    case REDRAW:
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
        grid: {
          ...state.grid,
          ...newGrid,
        },
      };
  }
}
