import {
  RECORD_DICE_LOG,
  ROLL_DICE,
  ENABLE_DICE,
} from '../actions/GameActions';

const initialState = {
  dice: {
    disabled: false,
    result: 1,
  },
};

export function dice(state = initialState, action) {
  switch (action.type) {
    case RECORD_DICE_LOG:
      return {
        ...state,
        dice: {
          disabled: true,
          result: action.diceResult,
        },
        players: {
          ...state.players,
          all: state.players.all.map(p => {
            if (p.id === state.players.current.id) {
              return {
                ...p,
                diceLog: [...p.diceLog, action.diceResult],
              };
            }
            return p;
          }),
          current: {
            ...state.players.current,
            diceLog: [...state.players.current.diceLog, action.diceResult],
          },
        },
      };

    case ENABLE_DICE:
      return {
        ...state,
        dice: {
          ...state.dice,
          disabled: false,
        },
      };

    case ROLL_DICE:
      return {
        ...state,
        dice: {
          ...state.dice,
          disabled: true,
        },
      };
    default:
      return state;
  }
}
