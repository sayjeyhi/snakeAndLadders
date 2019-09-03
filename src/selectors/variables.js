import { getGridMeasurement } from './utils';

const gridMeasurement = getGridMeasurement();
export const GRID_WIDTH = gridMeasurement;
export const GRID_HEIGHT = gridMeasurement;
export const BOX_WIDTH = GRID_WIDTH / 10;
export const BOX_HEIGHT = GRID_HEIGHT / 10;
export const GAME_START = -1;
export const GAME_ON = 1;
export const GAME_OVER = 0;
export const MAX_PLAYERS = 5;

export const GRID_LIGHT = 'rgba(57,181,255,0.64)';
export const GRID_DARK = 'rgba(255,121,117,0.35)';
