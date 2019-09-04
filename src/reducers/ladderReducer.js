import { getLadders } from '../selectors/utility';
import { ADD_LADDER_HIKE } from '../actions/GameActions';

const initialState = {
  ladders: getLadders(),
};

export function ladder(state = initialState, action) {
  switch (action.type) {
    case ADD_LADDER_HIKE:
      const newLadderHikes = state.players.current.ladderHikes + 1;
      return {
        ...state,
        players: {
          ...state.players,
          all: state.players.all.map(p => {
            if (p.id === state.players.current.id) {
              return {
                ...p,
                ladderHikes: newLadderHikes,
              };
            }
            return p;
          }),
          current: {
            ...state.players.current,
            ladderHikes: newLadderHikes,
          },
        },
      };
    default:
      return state;
  }
}
