import { ROLL_DICE, ENABLE_DICE, RESET_DICE } from "../actions/GameActions";

const initialState = {
  disabled: false,
  result: 1,
};

export function dice(state = initialState, action) {
  switch (action.type) {
    case ROLL_DICE:
      return {
        disabled: true,
        result: action.result,
      };

    case ENABLE_DICE:
      return {
        ...state,
        disabled: false,
      };

    case RESET_DICE:
      return {
        ...initialState
      };

    default:
      return state;
  }
}
