import { LOG_MESSAGE, RESET_MESSAGES } from '../constants/types';

const initialState = ['برای شروع بازی ، تاس بیندازید ✌'];

export function messages(state = initialState, action) {
  if (action.type === LOG_MESSAGE) {
    return [action.message, ...state];
  } else if (action.type === RESET_MESSAGES) {
    return initialState;
  } else {
    return state;
  }
}
