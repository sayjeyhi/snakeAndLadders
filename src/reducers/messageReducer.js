import { LOG_MESSAGE } from '../actions/GameActions';

const initialState = {
  messages: ['برای شروع بازی ، تاس بیندازید ✌'],
};

export function message(state = initialState, action) {
  switch (action.type) {
    case LOG_MESSAGE:
      return {
        ...state,
        messages: [action.message, ...state.messages],
      };
    default:
      return state;
  }
}
