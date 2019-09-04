import { END_GAME, RESTART_GAME } from '../actions/GameActions';
import { GAME_OVER, GAME_ON, GAME_START } from '../selectors/variables';

const initialState = {
  status: GAME_START,
};

export function game(state = initialState, action) {
  switch (action.type) {
    case END_GAME:
      return {
        ...state,
        status: GAME_OVER,
      };

    case RESTART_GAME:
      return {
        ...initialState,
        status: GAME_ON,
      };

    default:
      return state;
  }
}
