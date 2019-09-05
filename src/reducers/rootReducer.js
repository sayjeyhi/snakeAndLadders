import { combineReducers } from 'redux';

import { dice } from './diceReducer';
import { game } from './gameReducer';
import { players } from './playerReducer';
import { grid } from './gridReducer';
import { messages } from './messageReducer';

export default combineReducers({
  game,
  dice,
  players,
  grid,
  messages,
});
