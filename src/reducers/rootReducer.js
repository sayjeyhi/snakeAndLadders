import { combineReducers } from 'redux';

import { dice } from './diceReducer';
import { game } from './gameReducer';
import { ladder } from './ladderReducer';
import { player } from './playerReducer';
import { snake } from './snakeReducer';
import { grid } from './gridReducer';
import { message } from './messageReducer';

export default combineReducers({
  game,
  dice,
  ladder,
  snake,
  player,
  grid,
  message,
});
