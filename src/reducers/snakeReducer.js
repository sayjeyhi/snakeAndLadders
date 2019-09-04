import { getSnakes } from '../selectors/utility';
import { ADD_SNAKE_BITE } from '../actions/GameActions';

const initialState = {
  snakes: getSnakes(),
};

export function snake(state = initialState, action) {
  switch (action.type) {
    case ADD_SNAKE_BITE:
      const newSnakeBites = state.players.current.snakeBites + 1;
      return {
        ...state,
        players: {
          ...state.players,
          all: state.players.all.map(p => {
            if (p.id === state.players.current.id) {
              return {
                ...p,
                snakeBites: newSnakeBites,
              };
            }
            return p;
          }),
          current: {
            ...state.players.current,
            snakeBites: newSnakeBites,
          },
        },
      };
    default:
      return state;
  }
}
